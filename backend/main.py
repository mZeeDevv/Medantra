from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
import numpy as np
import os, io, base64
from PIL import Image
import cohere
from google import genai
from dotenv import load_dotenv
load_dotenv() 

app = FastAPI(title="Vision RAG API")

# CORS for local dev testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

# ========== INIT COHERE + GEMINI ==========
co = None
genai_client = None

@app.on_event("startup")
def init_clients():
        global co, genai_client
        COHERE_API_KEY = os.getenv("COHERE_API_KEY")
        GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

        if not COHERE_API_KEY or not GOOGLE_API_KEY:
            raise RuntimeError("API Keys are missing in environment variables.")

        co = cohere.ClientV2(api_key=COHERE_API_KEY)
        genai_client = genai.Client(api_key=GOOGLE_API_KEY)

# ========== UTILS ==========

MAX_PIXELS = 1568 * 1568

def resize_image(pil_image: Image.Image) -> Image.Image:
    w, h = pil_image.size
    if w * h > MAX_PIXELS:
        scale = (MAX_PIXELS / (w * h)) ** 0.5
        pil_image = pil_image.resize((int(w * scale), int(h * scale)))
    return pil_image

def pil_to_base64(pil_image: Image.Image) -> str:
    pil_image = resize_image(pil_image)
    buf = io.BytesIO()
    pil_image.save(buf, format="PNG")
    base64_img = base64.b64encode(buf.getvalue()).decode()
    return f"data:image/png;base64,{base64_img}"

def compute_image_embedding(base64_img: str) -> list:
    response = co.embed(
        model="embed-v4.0",
        input_type="search_document",
        embedding_types=["float"],
        images=[base64_img]
    )
    return response.embeddings.float[0]

# ========== ENDPOINTS ==========

# -------- 1. Embed Image --------
@app.post("/embed-image")
async def embed_image(file: UploadFile = File(...)):
    image = Image.open(file.file)
    base64_img = pil_to_base64(image)
    try:
        embedding = compute_image_embedding(base64_img)
        return {"embedding": embedding}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------- 2. Embed PDF --------
@app.post("/embed-pdf")
async def embed_pdf(file: UploadFile = File(...)):
    try:
        doc = fitz.open(stream=file.file.read(), filetype="pdf")
        embeddings = []
        page_imgs = []

        for page in doc.pages():
            pix = page.get_pixmap(dpi=150)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            base64_img = pil_to_base64(img)
            emb = compute_image_embedding(base64_img)
            embeddings.append(emb)
            page_imgs.append(base64_img)

        return {
            "num_pages": len(embeddings),
            "embeddings": embeddings,
            "images": page_imgs  # Optional: useful for debugging
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------- 3. Ask Question (RAG) --------
class QuestionRequest(BaseModel):
    question: str
    context_embeddings: list[list[float]]

@app.post("/ask")
def ask_question(payload: QuestionRequest):
    try:
        # Naive approach: just concatenate embeddings to a prompt
        context = "[Context info extracted from images]\n\n"
        prompt = f"{context}Q: {payload.question}\nA:"

        response = genai_client.models.generate_content(
            model="gemini-2.5-flash-preview-04-17",
            contents=prompt
        )
        return {"answer": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

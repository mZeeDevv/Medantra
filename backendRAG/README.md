###move to Rag_with_db

source .venv/Scripts/activate

uv add -r requirements.txt

## Run the code

uvicorn main:app --reload
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, Filter, FieldCondition, MatchValue
from uuid import uuid4
from typing import List
import os
from dotenv import load_dotenv
load_dotenv() 
COLLECTION_NAME = "test"

from qdrant_client.models import PayloadSchemaType

# Get Qdrant client - function to create client on demand
def get_qdrant_client():
    Qdrant_URL = os.getenv("QDRANT_CLOUD_HOST")
    Qdrant_API_KEY = os.getenv("QDRANT_CLOUD_API_KEY")
    return QdrantClient(
        url=Qdrant_URL,
        api_key=Qdrant_API_KEY
    )

def ensure_payload_index():
    qdrant = get_qdrant_client()
    qdrant.create_payload_index(
        collection_name=COLLECTION_NAME,
        field_name="user_id",
        field_schema=PayloadSchemaType.KEYWORD
    )



def ensure_collection_exists():
    from qdrant_client.models import VectorParams, Distance
    qdrant = get_qdrant_client()

    if not qdrant.collection_exists(COLLECTION_NAME):
        qdrant.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
        )

    # Ensure payload index exists
    try:
        ensure_payload_index()
    except Exception as e:
        print(f"Index may already exist or failed to create: {e}")

    collection_info = qdrant.get_collection(collection_name=COLLECTION_NAME)
    print(collection_info)



def store_embedding(user_id: str, vector: List[float], metadata: dict):
    qdrant = get_qdrant_client()
    point = PointStruct(
        id=uuid4().hex,
        vector=vector,
        payload={"user_id": user_id, **metadata}
    )
    qdrant.upsert(collection_name=COLLECTION_NAME, points=[point])

def search_user_embeddings(user_id: str, query_vector: List[float], limit: int = 5):
    qdrant = get_qdrant_client()
    return qdrant.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_vector,
        limit=limit,
        query_filter=Filter(
            must=[
                FieldCondition(key="user_id", match=MatchValue(value=user_id))
            ]
        )
    )

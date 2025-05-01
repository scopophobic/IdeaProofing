from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load the model once
model = SentenceTransformer("all-MiniLM-L6-v2")

app = FastAPI()

class Idea(BaseModel):
    idea_text: str

@app.post("/validate")
async def validate_idea(data: Idea):
    user_embedding = model.encode(data.idea_text)

    # Sample dummy ideas to compare (in a real app, fetch from DB or API)
    existing_ideas = [
        "An AI-based virtual assistant for fitness coaching",
        "A platform for decentralized car sharing using blockchain",
        "A smart mirror that gives beauty and health tips",
        "AI tool that helps authors write fiction novels faster",
        "A system to track food spoilage using IoT sensors"
    ]
    
    # Generate embeddings for each
    existing_embeddings = model.encode(existing_ideas)

    # Compare user idea to each existing idea
    similarities = cosine_similarity([user_embedding], existing_embeddings)[0]

    # Pair scores with ideas and sort by similarity
    top_matches = sorted(zip(existing_ideas, similarities), key=lambda x: x[1], reverse=True)

    # Novelty score is inverse of the highest similarity
    novelty_score = 100 - int(top_matches[0][1] * 100)

    return {
        "novelty_score": novelty_score,
        "top_similar_ideas": [
            {"idea": idea, "similarity": round(score, 2)} for idea, score in top_matches[:3]
        ]
    }

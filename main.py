from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llm import generate_queries
from google_patents import search_google_patents_api
from similarity import score_novelty
from models import Idea
import numpy as np
import json

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/validate")
async def validate_idea(data: Idea):
    print("🔹 Received idea:", data.idea_text)

    # Step 1: Generate search queries
    queries = json.loads(generate_queries(data.idea_text))
    # print("🔹 Generated Queries:", queries)

    # Step 2: Search Google Patents
    all_results = []
    for query in queries["queries"]:
        # print(f"🔍 Searching for: {query}")
        results = search_google_patents_api(query, num_results=5)
        # print(f"🔍 Results for '{query}':", results)
        all_results.extend(results)

    # print("🔹 Total Results Fetched:", len(all_results))
    if not all_results:
        return {"error": "No patent results found", "search_queries": queries}

    # Step 3: Score similarity
    scores = score_novelty(data.idea_text, all_results)
    # print("🔹 Novelty Score:", scores["novelty_score"])
    # print("🔹 Similar Patents:", scores["results"])

    return {
        "novelty_score": scores["novelty_score"],
        "similar_patents": scores["results"],
        # "search_queries": queries``
    }
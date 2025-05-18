from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

def score_novelty(user_text, patent_results):
    user_vec = model.encode([user_text])
    texts = [item["summary"] for item in patent_results]
    patent_vecs = model.encode(texts)
    sims = cosine_similarity(user_vec, patent_vecs)[0]

    all_matches = [
        {
            "title": r["title"],
            "summary": r["summary"],
            "link": r["link"],
            "similarity": round(float(score), 2)  # force float
        }
        for r, score in zip(patent_results, sims)
    ]

    sorted_matches = sorted(all_matches, key=lambda x: x["similarity"], reverse=True)

    novelty_score = 100 - int(sorted_matches[0]["similarity"] * 100)

    # ✅ Always return a dictionary
    return {
        "novelty_score": float(novelty_score),
        "results": sorted_matches
    }
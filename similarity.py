from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer("all-MiniLM-L6-v2")

def score_novelty(user_text, patent_results):
    user_vec = model.encode([user_text])
    texts = [item["summary"] for item in patent_results]
    patent_vecs = model.encode(texts)
    sims = cosine_similarity(user_vec, patent_vecs)[0]
    
    sorted_results = sorted(zip(patent_results, sims), key=lambda x: x[1], reverse=True)
    top_matches = [
        {
            "title": r["title"],
            "summary": r["summary"],
            "link": r["link"],
            "similarity": round(score, 2)
        }
        for r, score in sorted_results[:3]
    ]
    
    novelty_score = 100 - int(sorted_results[0][1] * 100)
    return novelty_score, top_matches

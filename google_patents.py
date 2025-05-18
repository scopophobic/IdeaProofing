import requests
import os
from dotenv import load_dotenv
import numpy as np

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID")

def search_google_patents_api(query, num_results=5):
    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": GOOGLE_API_KEY,
        "cx": GOOGLE_CSE_ID,
        "q": query,
        "num": num_results,
        "siteSearch": "patents.google.com",
        "siteSearchFilter": "i"
    }

    response = requests.get(search_url, params=params)

    if response.status_code != 200:
        print("❌ API Error:", response.status_code, response.text)
        return []

    data = response.json()
    results = []
    for item in data.get("items", []):
        results.append({
            "title": item.get("title", ""),
            "summary": item.get("snippet", ""),
            "link": item.get("link", "")
        })

    return results


#example usage
# results = search_google_patents_api("AI-powered", num_results=5)
# print(results)    
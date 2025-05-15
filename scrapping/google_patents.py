import requests
from bs4 import BeautifulSoup

def search_google_patents(queries: list, results_per_query=5) -> list:
    results = []
    for query in queries:
        url = f"https://patents.google.com/?q={query.replace(' ', '+')}"
        html = requests.get(url, headers={"User-Agent": "Mozilla/5.0"}).text
        soup = BeautifulSoup(html, "html.parser")
        for item in soup.select("search-result-item")[:results_per_query]:
            title = item.select_one("title").text.strip()
            summary = item.select_one("abstract").text.strip()
            link = "https://patents.google.com" + item.select_one("a")["href"]
            results.append({"title": title, "summary": summary, "link": link})
    return results

# 📌 Idea Validation & Novelty Analysis App

This project helps users validate if their startup/product idea is already existing or not, and how to make it more novel and impactful. It leverages patent databases, startup directories, LLMs, and market trend signals.

---

## 🔧 Tech Stack

- **Frontend**: Next.js (UI, Form Input, Results Display)
- **Backend**: FastAPI (API endpoints, LLM coordination, scraping, similarity logic)
- **LLM**: Gemini API (Google's LLM for query generation, suggestions)
- **Embedding Model**: `sentence-transformers` (MiniLM or similar)
- **Database**: SQLite (initial), upgrade to PostgreSQL or Supabase when scaling
- **Scraping Libraries**: `requests`, `BeautifulSoup4`, `playwright` (for dynamic content)

---

## 🧩 Modules Breakdown

### 1. User Prompt Input

- Text input form for user's idea description (long-form supported)
- Submit to FastAPI backend

### 2. Gemini Query Expansion

- Generate 5–10 relevant search queries (natural language style)
- Example Prompt: "Based on this idea, generate queries for searching similar concepts on Google Patents, Crunchbase, and Google Trends."

### 3. Data Sources

#### 📘 Patent Search (Google Patents)

- Scrape top 5 results per query
- Extract: Title, abstract, claim text if available, URL

#### 🚀 Startup Directory (Crunchbase or similar)

- Scrape startup descriptions, funding rounds, categories, etc.
- Focus on: similar space, similar value proposition

#### 📈 Market Trends (Google Trends API or scraping)

- Check for user idea's popularity
- Analyze interest over time and region

### 4. Semantic Similarity Engine

- Embed user idea and documents (patents, startup descriptions)
- Use cosine similarity to rank matches
- Top 5 similar items shown to user

### 5. LLM-Powered Suggestions (Gemini)

- "How to make it novel?"
- "What market niches are under-served?"
- "What features would improve uniqueness and feasibility?"

### 6. Database (Optional but Recommended)

- Store: user prompts, results, feedback, timestamps
- Helps in analytics, logging, tracking progress

---

## 📋 API Endpoints (FastAPI)

- `POST /analyze-idea`

  - Input: user idea text
  - Output:

    - Top similar patents
    - Similar startups
    - Market trends
    - Novelty suggestions

---

## 🔮 Future Enhancements

- User authentication
- Bookmarking/search history
- GPT-based product naming suggestions
- UI to display timelines or charts from Google Trends
- Claim-level patent analysis (using more advanced parsing)
- Upload pitch deck or PDF for analysis

---

## 💡 Business Value

- Helps aspiring founders avoid wasted effort
- Encourages innovation via LLM feedback
- Can be spun into a B2B IP-check or pitch-validation SaaS tool

---

## 🛠 Dev Setup

- Frontend: Next.js with TailwindCSS
- Backend: FastAPI + SQLite
- LLM: Gemini API access
- Scrapers: Respect rate limits and retry logic

---

## ✅ MVP Scope Checklist

- [ ] Form input with idea
- [ ] Generate search queries with Gemini
- [ ] Scrape Google Patents, Crunchbase, and Trends
- [ ] Compute similarity
- [ ] Return suggestions
- [ ] Basic frontend to display everything

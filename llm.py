import os
import json
# import google.generativeai as genai
from google import genai


# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
# model = genai.GenerativeModel("gemini-pro")

def generate_queries(prompt: str) -> str:
    system_prompt = (
        "Given a detailed app/idea description, generate 5 diverse search queries "
        "for checking if similar patents or startups exist. Return them as a plain list. give only the list, no other text"
    )
    # response = model.generate_content(system_prompt + "\n\n" + prompt)
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=system_prompt + "\n\n" + prompt
    )
    queries = [line.strip("- ").strip() for line in response.text.strip().split("\n") if line]
    return json.dumps({"queries": queries}, indent=2)

# Example usage
# idea_description = """
# A platform that allows users to create and share their own AI-generated images with friends.
# """
# queries_json = generate_queries(idea_description)
# print(queries_json)
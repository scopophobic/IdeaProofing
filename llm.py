import os
import json
import google.generativeai as genai

# Configure the API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_queries(prompt: str) -> str:
    system_prompt = (
        f"Generate 5 short, keyword-based search queries to find similar patents for the following idea. "
        f"Focus on technical terms and avoid full sentences or natural language. "
        f"Return them as a plain list. give only the list, no other text"
    )
    
    # Initialize the model
    model = genai.GenerativeModel('gemini-2.0-flash')
    
    try:
        # Generate content
        response = model.generate_content(system_prompt + "\n\n" + prompt)
        
        # Extract text and ensure it's a string
        response_text = str(response.text)
        
        # Process the response into a list of queries
        
        queries = [line.strip("- ").strip() for line in response_text.strip().split("\n") if line]
        cleaned_queries = [q.lstrip('*').strip() for q in queries]
        
        # Convert to JSON-serializable format
        return json.dumps({"queries": cleaned_queries}, indent=2)
    except Exception as e:
        # Return error in JSON format
        return json.dumps({"error": str(e)}, indent=2)

# Example usage
# idea_description = """
# A platform that allows users to create and share their own AI-generated images with friends.
# """
# queries_json = generate_queries(idea_description)
# print(queries_json)
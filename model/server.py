from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

import google.generativeai as genai
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv('GEMINI_API')
if not api_key:
    raise HTTPException(status_code=500, detail="No GEMINI_API key set in .env file")

genai.configure(api_key=api_key)

generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

default_prompt = '''
Your responses should be informative, actionable, and tailored to the given context.

Your responses can be in Markdown.
'''

prepared_headlines = ""

# Model for financial advice
advice_model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)

advice_convo = advice_model.start_chat(history=[
    {
        "role": "user",
        "parts": [default_prompt]
    },
    {
        "role": "model",
        "parts": ["Welcome to AI SaaS! Feel free to ask me anything."]
    },
])

'''
We can create different model instances and different endpoints for each action that the model has to perform.
'''


class UserInput(BaseModel):
    input_text: str

@app.post("/advice/")
async def send_advice(user_input: UserInput):
    #convo = classify_model.start_chat(history=[...])  # Initialize context for classification
    advice_convo.send_message(user_input.input_text)
    model_response = advice_convo.last.text
    return {"gemini_response_advice": model_response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)

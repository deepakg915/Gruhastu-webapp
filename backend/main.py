import os
import random
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
# pyrefly: ignore [missing-import]
from openai import OpenAI
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from google import genai
# pyrefly: ignore [missing-import]
from google.genai import types

load_dotenv()

app = FastAPI(title="Grihastu API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI Client Initialization
def get_ai_client():
    gemini_key = os.getenv("GEMINI_API_KEY")
    openai_key = os.getenv("OPENAI_API_KEY")
    
    if gemini_key:
        return "gemini", genai.Client(api_key=gemini_key)
    elif openai_key:
        # Check if it looks like a Gemini key even if named OPENAI_API_KEY
        if openai_key.startswith("AIza") or openai_key.startswith("AQ."):
            return "gemini", genai.Client(api_key=openai_key)
        else:
            return "openai", OpenAI(api_key=openai_key)
    return None, None

ai_type, ai_model = get_ai_client()

# Models
class Story(BaseModel):
    id: int
    title: str
    content: str
    lessons: List[str]
    image: str

class Stotra(BaseModel):
    id: int
    name: str
    content: str
    meaning: str
    benefit: str

class Festival(BaseModel):
    name: str
    date: str
    description: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

# Data
STORIES_DATA = [
    {
        "id": 1,
        "title": "The Ramayana",
        "content": "The journey of Rama, the seventh avatar of Vishnu, who seeks to rescue his wife Sita from the demon king Ravana.",
        "lessons": ["Dharma", "Devotion", "Duty"],
        "image": "https://images.unsplash.com/photo-1590050752117-23a9d7fc203e?auto=format&fit=crop&q=80&w=800"
    },
    {
        "id": 2,
        "title": "The Mahabharata",
        "content": "An epic narrative of the Kurukshetra War and the fates of the Kaurava and the Pandava princes.",
        "lessons": ["Karma", "Righteousness", "Duty"],
        "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800"
    },
]

STOTRAS_DATA = [
    {
        "id": 1,
        "name": "Hanuman Chalisa",
        "content": "Shree Guru Charan Saroj Raj, Nij Man Mukur Sudhari...",
        "meaning": "Having cleansed the mirror of my mind with the dust from the sacred feet of the Guru...",
        "benefit": "Removes obstacles and provides strength."
    },
    {
        "id": 2,
        "name": "Gayatri Mantra",
        "content": "Om Bhur Bhuva Swaha, Tat Savitur Varenyam...",
        "meaning": "We meditate upon the spiritual effulgence of that adorable supreme divine reality...",
        "benefit": "Enlightenment and wisdom."
    },
]

FESTIVALS_DATA = [
    {"name": "Diwali", "date": "Oct/Nov", "description": "The festival of lights, celebrating the return of Lord Rama to Ayodhya."},
    {"name": "Holi", "date": "March", "description": "The festival of colors, celebrating the victory of good over evil."}
]

LIFESTYLE_DATA = {
    "ayurveda": ["Drink warm water", "Eat seasonally", "Practice mindful eating"],
    "yoga": ["Surya Namaskar", "Tadasana", "Vrikshasana"],
    "meditation": ["Focus on breath", "Om chanting", "Trataka"]
}

FALLBACK_RESPONSES = [
    "Dharma is the foundation of life. What you do today shapes your karma.",
    "The Bhagavad Gita teaches us to perform our duty without attachment to the results.",
    "Meditation is the journey from sound to silence, from movement to stillness.",
    "Traditions are the roots that keep us grounded in values while we reach for the stars.",
    "As Lord Krishna says: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.'",
    "The Upanishads teach us: Tat Tvam Asi — Thou Art That. You are divine.",
    "Ahimsa, or non-violence, is the highest dharma. Treat all living beings with compassion.",
    "Prayer is not asking. It is a longing of the soul. It is daily admission of one's weakness.",
]


@app.get("/")
async def root():
    return {"message": "Welcome to Grihastu API"}


@app.get("/api/stories", response_model=List[Story])
async def get_stories():
    return STORIES_DATA


@app.get("/api/stotras", response_model=List[Stotra])
async def get_stotras():
    return STOTRAS_DATA


@app.get("/api/lifestyle", response_model=Dict[str, List[str]])
async def get_lifestyle():
    return LIFESTYLE_DATA


@app.get("/api/festivals", response_model=List[Festival])
async def get_festivals():
    return FESTIVALS_DATA


@app.post("/api/chat")
async def chat(request: ChatRequest):
    import random

    if ai_type == "gemini" and ai_model:
        try:
            contents = []
            for m in request.messages:
                # Gemini roles are 'user' or 'model' (not 'assistant')
                role = "user" if m.role == "user" else "model"
                contents.append(
                    types.Content(
                        role=role,
                        parts=[types.Part.from_text(text=m.content)]
                    )
                )
            
            config = types.GenerateContentConfig(
                system_instruction="You are Grihastu AI, a spiritual guide specializing in Hindu culture, scriptures, and traditions. Provide wise, compassionate, and helpful guidance based on Hindu philosophy."
            )
            
            response = ai_model.models.generate_content(
                model='gemini-2.5-flash',
                contents=contents,
                config=config
            )
            return {"role": "assistant", "content": response.text}
        except Exception as e:
            print(f"Gemini Error: {e}")
            pass

    elif ai_type == "openai" and ai_model:
        try:
            response = ai_model.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are Grihastu AI, a spiritual guide specializing in Hindu culture, scriptures, and traditions. Provide wise, compassionate, and helpful guidance based on Hindu philosophy."},
                    *[{"role": m.role, "content": m.content} for m in request.messages]
                ]
            )
            return {"role": "assistant", "content": response.choices[0].message.content}
        except Exception as e:
            print(f"OpenAI Error: {e}")
            pass

    return {"role": "assistant", "content": random.choice(FALLBACK_RESPONSES)}

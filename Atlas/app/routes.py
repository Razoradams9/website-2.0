"""API routes for the chat application."""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.chat import get_response

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[Message]


class ChatResponse(BaseModel):
    reply: str


@router.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Handle a chat request. Accepts the full conversation history
    and returns the assistant's next reply.
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="Messages list cannot be empty.")

    # Convert Pydantic models to dicts for the Anthropic API
    messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

    try:
        reply = get_response(messages)
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

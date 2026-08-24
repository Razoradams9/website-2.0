"""Chat service that handles communication with the Ollama API."""

import httpx
from app.config import OLLAMA_BASE_URL, OLLAMA_MODEL, SYSTEM_PROMPT


def get_response(messages: list[dict]) -> str:
    """
    Send a conversation to Ollama and return the assistant's response.

    Args:
        messages: List of message dicts with 'role' and 'content' keys.
                  Roles are 'user' or 'assistant'.

    Returns:
        The assistant's text response.
    """
    # Prepend the system message
    full_messages = [{"role": "system", "content": SYSTEM_PROMPT}] + messages

    response = httpx.post(
        f"{OLLAMA_BASE_URL}/api/chat",
        json={
            "model": OLLAMA_MODEL,
            "messages": full_messages,
            "stream": False,
        },
        timeout=120.0,  # Local models can be slow on first run
    )
    response.raise_for_status()

    data = response.json()
    return data["message"]["content"]

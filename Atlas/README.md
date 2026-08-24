# Atlas — Generative AI Assistant

A conversational AI assistant powered by Anthropic Claude, with a clean web-based chat interface.

## Features

- **Conversational AI** — Chat with Claude using full conversation context
- **Markdown rendering** — Code blocks, bold, italic, lists all render nicely
- **Dark theme UI** — Responsive chat interface that works on desktop and mobile
- **Simple architecture** — FastAPI backend + vanilla HTML/CSS/JS frontend

## Project Structure

```
Atlas/
├── main.py              # App entry point (FastAPI + Uvicorn)
├── app/
│   ├── config.py        # Environment config & system prompt
│   ├── chat.py          # Anthropic API integration
│   └── routes.py        # API endpoints
├── static/
│   ├── index.html       # Chat UI
│   ├── style.css        # Styling
│   └── app.js           # Frontend logic
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variable template
└── README.md
```

## Setup

### 1. Create a virtual environment

```bash
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure your API key

Copy the example env file and add your Anthropic API key:

```bash
cp .env.example .env
```

Edit `.env` and replace `your-api-key-here` with your actual key from [console.anthropic.com](https://console.anthropic.com/).

### 4. Run the application

```bash
python main.py
```

Open your browser to **http://127.0.0.1:8000** and start chatting.

## Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `ANTHROPIC_API_KEY` | *(required)* | Your Anthropic API key |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-20250514` | Which Claude model to use |

## Tech Stack

- **Backend:** Python, FastAPI, Uvicorn
- **AI:** Anthropic Claude API
- **Frontend:** HTML, CSS, JavaScript (no framework)

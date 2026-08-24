/**
 * Atlas AI Assistant — Frontend
 */

const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const newChatBtn = document.getElementById("newChatBtn");

// Conversation history
let conversationHistory = [];

// --- UI SETUP ---

// Auto-resize textarea
userInput.addEventListener("input", () => {
    userInput.style.height = "auto";
    userInput.style.height = Math.min(userInput.scrollHeight, 200) + "px";
    sendBtn.disabled = !userInput.value.trim();
});

// Send on Enter (Shift+Enter for newline)
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (userInput.value.trim()) {
            chatForm.dispatchEvent(new Event("submit"));
        }
    }
});

// Suggestion chips
document.querySelectorAll(".suggestion-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        userInput.value = chip.dataset.prompt;
        sendBtn.disabled = false;
        chatForm.dispatchEvent(new Event("submit"));
    });
});

// Sidebar toggle (mobile)
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// New chat button
newChatBtn.addEventListener("click", () => {
    conversationHistory = [];
    chatMessages.innerHTML = "";
    chatMessages.appendChild(createWelcomeScreen());
    sidebar.classList.remove("open");
});

// --- FORM SUBMIT ---

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    // Hide welcome screen
    if (welcomeScreen) {
        welcomeScreen.remove();
    }
    const existingWelcome = chatMessages.querySelector(".welcome");
    if (existingWelcome) existingWelcome.remove();

    // Add user message
    appendMessage("user", text);
    conversationHistory.push({ role: "user", content: text });

    // Clear input
    userInput.value = "";
    userInput.style.height = "auto";
    sendBtn.disabled = true;

    // Show typing
    const typingEl = showTypingIndicator();

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: conversationHistory }),
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.detail || "Something went wrong.");
        }

        const data = await response.json();
        const reply = data.reply;

        conversationHistory.push({ role: "assistant", content: reply });
        removeTypingIndicator(typingEl);
        appendMessage("assistant", reply);
    } catch (error) {
        removeTypingIndicator(typingEl);
        appendMessage("assistant", `Something went wrong: ${error.message}`);
    } finally {
        userInput.focus();
    }
});

// --- FUNCTIONS ---

function appendMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;

    const row = document.createElement("div");
    row.className = "message-row";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = role === "user" ? "Y" : "✦";

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";

    if (role === "assistant") {
        contentDiv.innerHTML = renderMarkdown(content);
    } else {
        contentDiv.textContent = content;
    }

    row.appendChild(avatar);
    row.appendChild(contentDiv);
    messageDiv.appendChild(row);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

function renderMarkdown(text) {
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // Code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code>${code.trim()}</code></pre>`;
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Bold
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

    // Italic
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

    // Unordered lists
    html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul>$&</ul>");

    // Ordered lists
    html = html.replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

    // Paragraphs
    html = html
        .split(/\n\n+/)
        .map((block) => {
            block = block.trim();
            if (!block) return "";
            if (
                block.startsWith("<pre>") ||
                block.startsWith("<ul>") ||
                block.startsWith("<ol>") ||
                block.startsWith("<li>")
            ) {
                return block;
            }
            return `<p>${block.replace(/\n/g, "<br>")}</p>`;
        })
        .join("");

    return html;
}

function showTypingIndicator() {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message assistant";

    const row = document.createElement("div");
    row.className = "message-row";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "✦";

    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";

    row.appendChild(avatar);
    row.appendChild(indicator);
    messageDiv.appendChild(row);
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return messageDiv;
}

function removeTypingIndicator(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

function scrollToBottom() {
    const wrapper = document.querySelector(".messages-wrapper");
    wrapper.scrollTop = wrapper.scrollHeight;
}

function createWelcomeScreen() {
    const div = document.createElement("div");
    div.className = "welcome";
    div.id = "welcomeScreen";
    div.innerHTML = `
        <div class="atlas-illustration">
            <svg width="200" height="220" viewBox="0 0 300 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="150" cy="80" r="75" fill="url(#ambientGlow2)" opacity="0.2"/>
                <circle cx="150" cy="80" r="55" fill="url(#globeFill2)" stroke="url(#globeStroke2)" stroke-width="2"/>
                <path d="M120 50 Q125 45 135 48 Q140 52 138 58 Q132 62 125 60 Q118 56 120 50Z" fill="rgba(167,139,250,0.3)" stroke="rgba(167,139,250,0.5)" stroke-width="0.8"/>
                <path d="M155 40 Q165 38 172 44 Q178 52 175 60 Q170 65 162 63 Q155 58 153 50 Q152 44 155 40Z" fill="rgba(129,140,248,0.3)" stroke="rgba(129,140,248,0.5)" stroke-width="0.8"/>
                <path d="M130 72 Q138 68 148 70 Q158 73 162 80 Q160 88 152 92 Q142 94 135 90 Q128 85 130 72Z" fill="rgba(167,139,250,0.25)" stroke="rgba(167,139,250,0.45)" stroke-width="0.8"/>
                <path d="M165 85 Q172 82 178 86 Q182 92 180 98 Q175 102 168 100 Q163 95 165 85Z" fill="rgba(129,140,248,0.25)" stroke="rgba(129,140,248,0.4)" stroke-width="0.8"/>
                <path d="M108 80 Q115 76 120 80 Q122 86 118 90 Q112 92 108 88 Q106 84 108 80Z" fill="rgba(196,181,253,0.2)" stroke="rgba(196,181,253,0.4)" stroke-width="0.8"/>
                <ellipse cx="150" cy="80" rx="55" ry="18" stroke="rgba(167,139,250,0.2)" stroke-width="0.7" fill="none"/>
                <ellipse cx="150" cy="60" rx="50" ry="14" stroke="rgba(167,139,250,0.15)" stroke-width="0.6" fill="none"/>
                <ellipse cx="150" cy="100" rx="50" ry="14" stroke="rgba(167,139,250,0.15)" stroke-width="0.6" fill="none"/>
                <ellipse cx="150" cy="80" rx="25" ry="55" stroke="rgba(167,139,250,0.15)" stroke-width="0.6" fill="none"/>
                <ellipse cx="150" cy="80" rx="45" ry="55" stroke="rgba(167,139,250,0.1)" stroke-width="0.5" fill="none"/>
                <ellipse cx="130" cy="55" rx="18" ry="14" fill="rgba(255,255,255,0.05)"/>
                <path d="M134 165 Q130 155 128 148 Q127 142 130 138 Q136 134 150 133 Q164 134 170 138 Q173 142 172 148 Q170 155 166 165 Q160 178 158 190 Q155 198 150 200 Q145 198 142 190 Q140 178 134 165Z" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1.5"/>
                <path d="M138 145 Q144 148 150 147 Q156 148 162 145" stroke="rgba(167,139,250,0.3)" stroke-width="0.8" fill="none"/>
                <path d="M150 147 L150 165" stroke="rgba(167,139,250,0.2)" stroke-width="0.6"/>
                <path d="M143 158 Q150 160 157 158" stroke="rgba(167,139,250,0.2)" stroke-width="0.6" fill="none"/>
                <path d="M144 167 Q150 169 156 167" stroke="rgba(167,139,250,0.2)" stroke-width="0.6" fill="none"/>
                <path d="M145 176 Q150 178 155 176" stroke="rgba(167,139,250,0.15)" stroke-width="0.6" fill="none"/>
                <ellipse cx="150" cy="125" rx="10" ry="11" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1.5"/>
                <path d="M145 135 Q150 137 155 135 L155 133 Q150 131 145 133Z" fill="url(#bodyFill2)"/>
                <path d="M130 140 Q120 135 112 125 Q108 118 110 112 Q113 108 118 110 Q122 113 125 118" stroke="url(#bodyStroke2)" stroke-width="4" stroke-linecap="round" fill="none"/>
                <ellipse cx="128" cy="139" rx="6" ry="5" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1"/>
                <path d="M120 135 Q116 130 114 124" stroke="url(#bodyStroke2)" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.5"/>
                <circle cx="118" cy="112" r="5" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1.2"/>
                <path d="M115 108 Q113 105 114 102" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M118 107 Q117 104 118 101" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M121 108 Q121 105 122 102" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M170 140 Q180 135 188 125 Q192 118 190 112 Q187 108 182 110 Q178 113 175 118" stroke="url(#bodyStroke2)" stroke-width="4" stroke-linecap="round" fill="none"/>
                <ellipse cx="172" cy="139" rx="6" ry="5" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1"/>
                <path d="M180 135 Q184 130 186 124" stroke="url(#bodyStroke2)" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.5"/>
                <circle cx="182" cy="112" r="5" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1.2"/>
                <path d="M179 108 Q179 105 178 102" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M182 107 Q183 104 182 101" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M185 108 Q187 105 186 102" stroke="url(#bodyStroke2)" stroke-width="1.5" stroke-linecap="round" fill="none"/>
                <path d="M143 198 Q138 215 134 235 Q132 248 130 260 Q129 270 132 278 Q135 282 138 280" stroke="url(#bodyStroke2)" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M134 250 Q131 258 132 268" stroke="url(#bodyStroke2)" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.4"/>
                <path d="M132 278 Q130 282 128 284 Q126 286 130 287 Q136 288 140 286 Q142 284 138 280" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1"/>
                <path d="M157 198 Q162 215 166 235 Q168 248 170 260 Q171 270 168 278 Q165 282 162 280" stroke="url(#bodyStroke2)" stroke-width="5" stroke-linecap="round" fill="none"/>
                <path d="M166 250 Q169 258 168 268" stroke="url(#bodyStroke2)" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.4"/>
                <path d="M168 278 Q170 282 172 284 Q174 286 170 287 Q164 288 160 286 Q158 284 162 280" fill="url(#bodyFill2)" stroke="url(#bodyStroke2)" stroke-width="1"/>
                <ellipse cx="150" cy="290" rx="35" ry="5" fill="rgba(167,139,250,0.1)"/>
                <circle cx="70" cy="50" r="2" fill="#a78bfa" opacity="0.6"><animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="230" cy="60" r="1.5" fill="#818cf8" opacity="0.5"><animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle cx="85" cy="110" r="1.2" fill="#c4b5fd" opacity="0.7"><animate attributeName="opacity" values="0.7;0.2;0.7" dur="4s" repeatCount="indefinite"/></circle>
                <circle cx="220" cy="100" r="1.8" fill="#a78bfa" opacity="0.4"><animate attributeName="opacity" values="0.4;0.1;0.4" dur="3.5s" repeatCount="indefinite"/></circle>
                <defs>
                    <radialGradient id="ambientGlow2" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#a78bfa"/><stop offset="100%" stop-color="transparent"/></radialGradient>
                    <radialGradient id="globeFill2" cx="35%" cy="35%" r="60%"><stop offset="0%" stop-color="rgba(99,102,241,0.15)"/><stop offset="100%" stop-color="rgba(30,30,30,0.8)"/></radialGradient>
                    <linearGradient id="globeStroke2" x1="95" y1="25" x2="205" y2="135"><stop offset="0%" stop-color="#c4b5fd"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
                    <linearGradient id="bodyFill2" x1="130" y1="120" x2="170" y2="290"><stop offset="0%" stop-color="#2d2b55"/><stop offset="100%" stop-color="#1a1a2e"/></linearGradient>
                    <linearGradient id="bodyStroke2" x1="130" y1="110" x2="170" y2="290"><stop offset="0%" stop-color="#a78bfa"/><stop offset="50%" stop-color="#818cf8"/><stop offset="100%" stop-color="#6366f1"/></linearGradient>
                </defs>
            </svg>
        </div>
        <h1>What can I help with?</h1>
        <div class="suggestions">
            <button class="suggestion-chip" data-prompt="Help me brainstorm ideas for a project">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                Brainstorm ideas
            </button>
            <button class="suggestion-chip" data-prompt="Write me a professional email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                Write an email
            </button>
            <button class="suggestion-chip" data-prompt="Explain a concept to me simply">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Explain a concept
            </button>
            <button class="suggestion-chip" data-prompt="Help me write some code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                Help with code
            </button>
        </div>
    `;

    // Re-bind suggestion chips
    div.querySelectorAll(".suggestion-chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            userInput.value = chip.dataset.prompt;
            sendBtn.disabled = false;
            chatForm.dispatchEvent(new Event("submit"));
        });
    });

    return div;
}

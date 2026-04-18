import { useState } from "react";

import { buildApiUrl } from "../api.js";

const starterMessage = {
  role: "assistant",
  content: "Hi, I can help with quotes, services, and what to expect before booking.",
};

const quickPrompts = [
  "What services do you offer?",
  "How fast can I get a quote?",
  "What happens after I submit the form?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([starterMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(buildApiUrl("/api/chat"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const rawText = await response.text();
        throw new Error(
          response.ok
            ? "The chatbot returned a non-JSON response. Check VITE_API_URL and the /api/chat backend route."
            : rawText || "Chatbot unavailable"
        );
      }

      if (!response.ok) {
        throw new Error(data.error || "Chatbot unavailable");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.reply || "I couldn't generate a reply just now." },
      ]);
    } catch (requestError) {
      setError(requestError.message || "Chatbot unavailable");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await sendMessage(input);
  };

  return (
    <div className={`chatbot-shell ${isOpen ? "is-open" : ""}`}>
      {isOpen ? (
        <section className="chatbot-panel">
          <div className="chatbot-header">
            <div>
              <span className="eyebrow chatbot-eyebrow mb-2">AI Assistant</span>
              <h2 className="chatbot-title mb-1">Ask about your lawn care needs</h2>
              <p className="chatbot-subtitle mb-0">
                Fast answers about services, quotes, and next steps.
              </p>
            </div>
            <button
              type="button"
              className="btn-close chatbot-close"
              aria-label="Close chatbot"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`chatbot-message ${message.role === "user" ? "is-user" : "is-assistant"}`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message is-assistant">
                Thinking...
              </div>
            )}
          </div>

          <div className="chatbot-prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="chatbot-prompt"
                onClick={() => sendMessage(prompt)}
                disabled={isLoading}
              >
                {prompt}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <textarea
              className="form-control chatbot-input"
              rows="3"
              placeholder="Ask about quotes, services, or booking..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="btn btn-brand" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>

          {error && <p className="chatbot-error mb-0">{error}</p>}
        </section>
      ) : (
        <button type="button" className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <i className="bi bi-stars me-2"></i>
          Ask AI
        </button>
      )}
    </div>
  );
};

export default Chatbot;

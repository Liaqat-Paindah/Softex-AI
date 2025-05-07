'use client';

import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const res = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();
      const assistantMessage =
        data.choices?.[0]?.message?.content || 'No response from Softex AI.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantMessage },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Error fetching response.' },
      ]);
    }
  };
  return (
 
    <div className=" mt-6 bg-[#0a0f1a] flex items-center justify-center px-4 py-2">
      <div className="w-full max-w-3xl h-[70vh] bg-[#121826] rounded-[4px] shadow-2xl flex flex-col p-6 border border-[#2e3a4e]">
        <h2 className="text-2xl font-semibold text-gray-100  text-center">
          Welcome to Softex AI
        </h2>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-4 px-1 sm:px-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-xl px-4 py-3 max-w-xl text-sm leading-relaxed shadow
                ${msg.role === 'user'
                  ? 'bg-cyan-700 text-white'
                  : 'bg-[#1f2937] text-gray-200'}`}
              >
                <ReactMarkdown
                  components={{
                    p: (props) => <p {...props} className="prose prose-sm prose-invert" />,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your message..."
            className="flex-1 rounded border border-[#2e3a4e] bg-[#1f2937] text-[12px] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
          <button
            onClick={handleSubmit}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-5 py-2 rounded text-[12px] shadow transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function BotSimulatorPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "assistant", content: "Hello! I am your AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMsg.content }),
            });

            if (!response.ok) throw new Error("Failed to send message");

            const data = await response.json();
            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.reply };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error(error);
            const errorMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: "Sorry, I encountered an error." };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-4">
                <h2 className="text-3xl font-bold tracking-tight">Bot Simulator</h2>
                <p className="text-muted-foreground">Test your AI agent's responses in real-time.</p>
            </div>

            <div className="flex-1 border rounded-xl bg-card shadow-sm flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50">
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={cn(
                                "flex items-start gap-3 max-w-[80%]",
                                m.role === "user" ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                                    m.role === "user" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                                )}
                            >
                                {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div
                                className={cn(
                                    "p-3 rounded-lg text-sm",
                                    m.role === "user"
                                        ? "bg-blue-600 text-white rounded-tr-none"
                                        : "bg-white dark:bg-slate-800 border shadow-sm rounded-tl-none"
                                )}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="p-3 rounded-lg text-sm bg-white dark:bg-slate-800 border shadow-sm rounded-tl-none">
                                <span className="animate-pulse">Typing...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-background border-t">
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            className="flex-1 px-4 py-2 rounded-md border bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

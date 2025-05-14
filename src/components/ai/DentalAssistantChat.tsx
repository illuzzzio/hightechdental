
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Loader2 } from "lucide-radix-icons"; // Assuming these icons exist or similar from lucide-react
import { getDentalAssistantResponse } from "@/lib/actions";
import type { DentalAssistantInput } from "@/ai/flows/dental-assistant";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

export function DentalAssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const aiInput: DentalAssistantInput = { question: input };
      const response = await getDentalAssistantResponse(aiInput);

      if ("error" in response) {
         setError(response.error);
         const aiErrorMessage: Message = { id: Date.now().toString() + "_err", text: `Error: ${response.error}`, sender: "ai" };
         setMessages((prev) => [...prev, aiErrorMessage]);
      } else {
        const aiMessage: Message = { id: Date.now().toString() + "_ai", text: response.answer, sender: "ai" };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err: any) {
      const errorMessage = err.message || "An unexpected error occurred.";
      setError(errorMessage);
      const aiErrorMessage: Message = { id: Date.now().toString() + "_err_catch", text: `Error: ${errorMessage}`, sender: "ai" };
      setMessages((prev) => [...prev, aiErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <Bot className="h-12 w-12 mx-auto text-primary" />
        <CardTitle className="text-2xl font-bold">Dental AI Assistant</CardTitle>
        <CardDescription>Ask any questions about dental procedures and treatments.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full p-4 border rounded-md bg-muted/30">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && <Bot className="h-6 w-6 text-primary shrink-0" />}
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 shadow ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === "user" && <User className="h-6 w-6 text-foreground/70 shrink-0" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <Bot className="h-6 w-6 text-primary shrink-0" />
                <div className="max-w-[75%] rounded-lg px-4 py-2 shadow bg-background text-foreground border">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

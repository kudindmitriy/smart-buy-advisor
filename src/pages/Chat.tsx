
import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const EXAMPLE_CONVERSATION: ChatMessage[] = [
  {
    id: "1",
    sender: "assistant",
    text: "Hello! I'm your shopping consultant. How can I help you?",
    timestamp: new Date(Date.now() - 5000),
  },
];

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>(EXAMPLE_CONVERSATION);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const simulateAssistantResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Wait for a short time to simulate thinking
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let response: ChatMessage;
    
    if (userMessage.toLowerCase().includes("laptop")) {
      response = {
        id: Date.now().toString(),
        sender: "assistant",
        text: "Great! I'll help you choose the optimal laptop. What is your budget?",
        timestamp: new Date(),
      };
    } else if (userMessage.toLowerCase().includes("budget") || userMessage.includes("$")) {
      response = {
        id: Date.now().toString(),
        sender: "assistant",
        text: "Thank you! And what tasks do you plan to solve with the laptop? For example: working with documents, programming, gaming, design, video editing, etc.",
        timestamp: new Date(),
      };
    } else if (
      userMessage.toLowerCase().includes("gam") ||
      userMessage.toLowerCase().includes("design") ||
      userMessage.toLowerCase().includes("program") ||
      userMessage.toLowerCase().includes("document")
    ) {
      response = {
        id: Date.now().toString(),
        sender: "assistant",
        text: "Great, I'm analyzing the market based on your requirements... \n\nBased on your budget and specified tasks, I recommend considering the following models: \n\n1. **Acer Swift 3** - excellent value for money, suitable for working with documents and web surfing. \n\n2. **ASUS TUF Gaming F15** - powerful laptop with discrete graphics card, ideal for gaming. \n\n3. **Apple MacBook Air M2** - compact and powerful, perfect for design and programming. \n\nWould you like to know more about a specific model?",
        timestamp: new Date(),
      };
    } else {
      response = {
        id: Date.now().toString(),
        sender: "assistant",
        text: "To help you make a choice, could you please tell me what product you're looking to purchase?",
        timestamp: new Date(),
      };
    }
    
    setMessages((prev) => [...prev, response]);
    setIsTyping(false);
  };
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: input,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    await simulateAssistantResponse(input);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
  
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 bg-white border-b border-gray-200 hidden md:block">
          <h1 className="text-xl font-semibold">Chat with consultant</h1>
          <p className="text-sm text-gray-500">Ask a question about the product you want to buy</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-3 max-w-[80%] animate-slide-in",
                message.sender === "user" ? "ml-auto" : ""
              )}
            >
              {message.sender === "assistant" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-app-accent text-white">SC</AvatarFallback>
                </Avatar>
              )}
              
              <div
                className={cn(
                  "rounded-lg p-3",
                  message.sender === "user"
                    ? "bg-app-accent text-white"
                    : "bg-gray-100 text-app-text"
                )}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div
                  className={cn(
                    "text-xs mt-1",
                    message.sender === "user" ? "text-white/70" : "text-gray-500"
                  )}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-app-accent text-white">SC</AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-gray-100">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a message..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping}>
              {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default Chat;

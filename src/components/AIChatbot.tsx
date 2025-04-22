
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        content: "Thank you for your message. I'm here to help with any medical queries. For specific medical advice, please use our symptom analyzer or consult with a doctor.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 flex flex-col shadow-lg">
          <div className="bg-primary p-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2 text-white">
              <Bot className="h-5 w-5" />
              <span>Medical Assistant</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-primary/90"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </Button>
          </div>
          <CardContent className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </CardContent>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">Send</Button>
            </form>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-12 w-12 p-0"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default AIChatbot;

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loadHistory: (description: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  const loadHistory = (description: string) => {
    const botMessage: Message = {
      role: "bot",
      content: description,
      timestamp: new Date(),
    };
    setMessages([botMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, setMessages, loadHistory }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within ChatProvider");
  }
  return context;
}

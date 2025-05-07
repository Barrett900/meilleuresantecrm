
import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, PhoneCall, VideoIcon } from "lucide-react";
import { useAuth } from "@/components/auth/AuthLayout";

// Mock data pour les messages
const mockUsers = {
  1: { id: 1, name: "Jean Dupont", avatar: "JD", isAdmin: true },
  2: { id: 2, name: "Marie Leroy", avatar: "ML", isAdmin: false },
  3: { id: 3, name: "Pierre Martin", avatar: "PM", isAdmin: false },
  4: { id: 4, name: "Sophie Bernard", avatar: "SB", isAdmin: false }
};

const mockChats = {
  1: [
    { id: 1, senderId: 1, text: "Bonjour, comment ça va aujourd'hui?", time: "10:15" },
    { id: 2, senderId: "current-user", text: "Bonjour Jean! Très bien merci, et vous?", time: "10:17" },
    { id: 3, senderId: 1, text: "Je vais bien, merci. Pouvez-vous me faire un point sur les dossiers en cours?", time: "10:20" },
    { id: 4, senderId: "current-user", text: "Bien sûr, j'ai terminé les 3 dossiers prioritaires. Je vous envoie un récapitulatif par email.", time: "10:25" },
    { id: 5, senderId: 1, text: "Parfait, merci pour votre efficacité.", time: "10:30" }
  ],
  2: [
    { id: 1, senderId: "current-user", text: "Bonjour Marie, avez-vous besoin d'aide?", time: "Hier 14:20" },
    { id: 2, senderId: 2, text: "Bonjour! Oui, j'ai besoin d'aide avec un dossier client.", time: "Hier 14:25" },
    { id: 3, senderId: 2, text: "Pouvez-vous m'aider avec le dossier Dupont?", time: "Hier 14:26" },
    { id: 4, senderId: "current-user", text: "Bien sûr, je peux vous aider. Quelles informations vous manquent?", time: "Hier 14:30" }
  ],
  3: [
    { id: 1, senderId: 3, text: "Merci pour les informations.", time: "Mer 09:10" },
    { id: 2, senderId: "current-user", text: "De rien, n'hésitez pas si vous avez d'autres questions.", time: "Mer 09:15" }
  ],
  4: [
    { id: 1, senderId: 4, text: "Bonjour, j'ai terminé le rapport demandé", time: "Lun 16:45" }
  ]
};

interface ChatWindowProps {
  selectedChatId: number | null;
}

const ChatWindow = ({ selectedChatId }: ChatWindowProps) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { userRole } = useAuth();
  
  // Charger les messages quand l'ID du chat change
  useEffect(() => {
    if (selectedChatId && mockChats[selectedChatId as keyof typeof mockChats]) {
      setMessages(mockChats[selectedChatId as keyof typeof mockChats]);
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);
  
  // Scroll vers le bas quand les messages changent
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChatId) return;
    
    const newMessage = {
      id: messages.length + 1,
      senderId: "current-user",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageText("");
    
    // Simuler une réponse après 1 seconde
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const recipient = mockUsers[selectedChatId as keyof typeof mockUsers];
        const autoReply = {
          id: messages.length + 2,
          senderId: selectedChatId,
          text: "Je vous réponds dès que possible.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };
  
  if (!selectedChatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Bienvenue dans votre messagerie</h3>
          <p className="text-gray-500">Sélectionnez une conversation pour commencer à discuter</p>
        </div>
      </div>
    );
  }
  
  const chatPartner = mockUsers[selectedChatId as keyof typeof mockUsers];
  
  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-white">
            {chatPartner.avatar}
          </div>
          <div>
            <div className="font-medium">
              {chatPartner.name}
              {chatPartner.isAdmin && (
                <span className="ml-1 text-xs bg-sidebar-accent text-white rounded-full px-1.5 py-0.5">
                  Admin
                </span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {Math.random() > 0.5 ? "En ligne" : "Dernière connexion il y a 3h"}
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="icon" title="Appel vocal">
            <PhoneCall size={18} />
          </Button>
          <Button variant="outline" size="icon" title="Appel vidéo">
            <VideoIcon size={18} />
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">
                {msg.senderId !== "current-user" && (
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-sidebar-accent flex-shrink-0 flex items-center justify-center text-white text-xs">
                      {chatPartner.avatar}
                    </div>
                    <span className="text-xs font-medium">{chatPartner.name}</span>
                  </div>
                )}
                
                <div
                  className={`rounded-lg p-3 ${
                    msg.senderId === "current-user"
                      ? "bg-sidebar-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="text-sm">{msg.text}</div>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Écrivez votre message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
            <Send size={18} className="mr-2" />
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

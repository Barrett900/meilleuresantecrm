
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data pour les conversations
const mockChats = [
  {
    id: 1,
    name: "Jean Dupont",
    avatar: "JD",
    lastMessage: "Bonjour, comment ça va aujourd'hui?",
    time: "10:30",
    unread: 2,
    isOnline: true,
    isAdmin: true
  },
  {
    id: 2,
    name: "Marie Leroy",
    avatar: "ML",
    lastMessage: "Pouvez-vous m'aider avec un dossier?",
    time: "Hier",
    unread: 0,
    isOnline: true,
    isAdmin: false
  },
  {
    id: 3,
    name: "Pierre Martin",
    avatar: "PM",
    lastMessage: "Merci pour l'information!",
    time: "Mer",
    unread: 0,
    isOnline: false,
    isAdmin: false
  },
  {
    id: 4,
    name: "Sophie Bernard",
    avatar: "SB",
    lastMessage: "J'ai terminé le rapport demandé",
    time: "Lun",
    unread: 1,
    isOnline: false,
    isAdmin: false
  }
];

interface ChatSidebarProps {
  onSelectChat: (chatId: number) => void;
  selectedChat: number | null;
}

const ChatSidebar = ({ onSelectChat, selectedChat }: ChatSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredChats = mockChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="w-72 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Input 
            placeholder="Rechercher..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" variant="ghost">
            <Search size={18} />
          </Button>
        </div>
        
        <Button className="w-full flex items-center gap-2">
          <Plus size={18} />
          Nouveau message
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100",
                selectedChat === chat.id && "bg-gray-100"
              )}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-white">
                  {chat.avatar}
                </div>
                {chat.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <div className="font-medium truncate">
                    {chat.name}
                    {chat.isAdmin && (
                      <span className="ml-1 text-xs bg-sidebar-accent text-white rounded-full px-1.5 py-0.5">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">{chat.time}</div>
                </div>
                
                <div className="text-sm text-gray-500 truncate">{chat.lastMessage}</div>
              </div>
              
              {chat.unread > 0 && (
                <div className="min-w-5 h-5 rounded-full bg-sidebar-primary text-white text-xs flex items-center justify-center px-1.5">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;

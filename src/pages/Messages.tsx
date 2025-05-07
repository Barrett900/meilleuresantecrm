
import { useState } from "react";
import Header from "@/components/layout/Header";
import ChatSidebar from "@/components/messaging/ChatSidebar";
import ChatWindow from "@/components/messaging/ChatWindow";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1);

  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <Header title="Messages" />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar onSelectChat={setSelectedChat} selectedChat={selectedChat} />
        <ChatWindow selectedChatId={selectedChat} />
      </div>
    </div>
  );
};

export default Messages;

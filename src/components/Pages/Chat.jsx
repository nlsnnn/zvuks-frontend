import { useState } from "react";
import { ChatSidebar } from "../Features/Chat/ChatSidebar";
import { ChatWindow } from "../Features/Chat/ChatWindow";

export const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);

  const isMobile = window.innerWidth < 768;
  const showSidebar = !activeChat || !isMobile;

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      {showSidebar && (
        <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
      {(!isMobile || activeChat) && (
        <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} />
      )}
    </div>
  );
};

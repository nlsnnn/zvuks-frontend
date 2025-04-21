import { useState } from "react";
import { ChatSidebar } from "../Features/Chat/ChatSidebar";
import { ChatWindow } from "../Features/Chat/ChatWindow";

export const Chat = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
      <ChatSidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} setActiveChat={setActiveChat} />
    </div>
  );
};

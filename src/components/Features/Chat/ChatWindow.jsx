import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { chatStore } from "../../../store/chatStore";
import { websocketURL } from "../../../config/constants";
import { Message } from "./Message";

export const ChatWindow = observer(({ activeChat, setActiveChat }) => {
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeChat) {
      chatStore.getMessages(activeChat.id).then(() => {
        setTimeout(() => {
          bottomRef.current?.scrollIntoView({ behavior: "auto" });
        }, 100);
      });

      const ws = new WebSocket(websocketURL + activeChat.id);

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        chatStore.messages = [...chatStore.messages, msg];
      };

      return () => ws.close();
    }
  }, [activeChat]);

  useEffect(() => {
    const isNearBottom = () => {
      if (!containerRef.current) return false;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      return scrollHeight - scrollTop - clientHeight < 50;
    };
    if (isNearBottom()) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatStore.messages]);

  const handleSend = () => {
    if (text.trim()) {
      chatStore.sendMessage(activeChat.id, text.trim());
      setText("");
    }
  };

  const handleInputSend = (key) => {
    if (key === "Enter" && text.trim()) {
      chatStore.sendMessage(activeChat.id, text.trim());
      setText("");
    }
  };

  if (!activeChat) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Выберите пользователя для чата
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--color-light)]">
      <div className="p-4 border-b font-semibold text-dark flex items-center gap-2">
        <button
          onClick={() => setActiveChat(null)}
          className="md:hidden text-primary font-medium"
        >
          Назад
        </button>
        <span className="truncate">{activeChat.username}</span>
      </div>

      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {chatStore.messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
        {!chatStore.messages.length && (
          <p className="text-lg text-center p-16 text-muted">
            Начните общение!
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => handleInputSend(e.key)}
          placeholder="Введите сообщение..."
          className="flex-1 p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="btn-primary px-4"
          disabled={!text.trim()}
        >
          Отправить
        </button>
      </div>
    </div>
  );
});

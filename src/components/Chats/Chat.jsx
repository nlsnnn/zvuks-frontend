import { useEffect, useState } from "react";
import { chatStore } from "../../store/chatStore";
import { Message } from "./Message";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { websocketURL } from "../../config/constants";

export const Chat = observer(({ userId }) => {
  const [messageContent, setMessageContent] = useState("");
  const [websocket, setWebsocket] = useState(null);

  useEffect(() => {
    if (userId) {
      chatStore.getMessages(userId);

      const ws = new WebSocket(websocketURL + userId);

      ws.onopen = () => {
        console.log("Websocket start!");
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        chatStore.messages = [...chatStore.messages, msg];
      };

      ws.onclose = () => {
        console.log("Websocket end!");
      };

      setWebsocket(ws);

      return () => {
        ws.close();
      }
    }
  }, [userId]);

  const handleClick = async () => {
    if (messageContent.trim().length) {
      await chatStore.sendMessage(userId, messageContent);
      setMessageContent("");
    }
  };

  return (
    <>
      <div className="p-2 flex flex-col  rounded border border-black w-full">
        <div className="px-2 py-2 flex items-center gap-3 border-b border-black cursor-pointer">
          <img
            src="/hamster.jpg"
            alt="carson"
            className="rounded-full w-12 h-12"
          />
          <span>{chatStore.username}</span>
        </div>
        <div className="flex flex-col flex-grow h-screen  bg-gray-50 shadow-xl rounded-lg overflow-hidden">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {chatStore.messages &&
              chatStore.messages.map((message) => (
                <Message
                  content={message.content}
                  time={message.created_at}
                  sender={message.sender_id}
                  key={message.id}
                />
              ))}
            {!chatStore.messages.length && (
              <h2 className="text-center text-4xl pt-52">Начните общение!</h2>
            )}
          </div>
          <div className="bg-gray-300 p-4 flex ">
            <input
              className="flex items-center h-10 w-full rounded px-3 text-sm"
              type="text"
              placeholder="Type your message…"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-3xl hover-blue pointer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </>
  );
});

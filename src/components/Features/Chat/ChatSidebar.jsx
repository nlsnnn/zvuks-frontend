import { observer } from "mobx-react-lite";
import { friendStore } from "../../../store/friendStore";
import { useEffect } from "react";

export const ChatSidebar = observer(({ activeChat, setActiveChat }) => {
  useEffect(() => {
    friendStore.getFriends();
  }, []);

  return (
    <aside className="w-full md:w-72 md:border-r bg-white overflow-y-auto">
      <div className="p-4 font-semibold text-lg text-center md:text-left">Диалоги</div>
      {friendStore.friends.map((friend) => (
        <div
          key={friend.id}
          className={`flex border-b md:border-none items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 transition ${
            activeChat?.id === friend.id ? "bg-gray-100" : ""
          }`}
          onClick={() => setActiveChat(friend)}
        >
          <img
            src={friend.avatar}
            alt={friend.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="truncate">{friend.username}</div>
        </div>
      ))}
    </aside>
  );
});

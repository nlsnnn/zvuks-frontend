import { userStore } from "../../../store/userStore";

export const Message = ({ msg }) => {
  const isMine = msg.sender_id === userStore.user.id;

  return (
    <div className={`w-full flex ${isMine ? "justify-end" : "justify-start"} `}>
      <div
        className={`relative max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm flex flex-col gap-1 ${
          isMine
            ? "bg-[var(--color-primary)] text-white"
            : "bg-gray-200 text-dark"
        }`}
      >
        <div className="text-sm whitespace-pre-wrap break-words">
          {msg.content}
        </div>
        <div className="text-xs text-right text-gray-400">
          {new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};

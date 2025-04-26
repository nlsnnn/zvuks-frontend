import { useState } from "react";
import { chatStore } from "../../../store/chatStore";
import { userStore } from "../../../store/userStore";
import { FaTrash, FaPen } from "react-icons/fa";
import { observer } from "mobx-react-lite";

export const Message = observer(({ msg }) => {
  const isMine = msg.sender === userStore.user.id;
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.content);

  const handleDelete = () => {
    if (confirm("Удалить сообщение?")) {
      chatStore.deleteMessage(msg.id);
    }
  };

  const handleEdit = () => {
    if (editText.trim()) {
      chatStore.editMessage(msg.id, editText.trim()).then(() => {
        setIsEditing(false);
      });
      msg.content = editText.trim();
    }
  };

  return (
    <div
      className={`w-full gap-2 flex ${
        isMine ? "justify-end" : "justify-start"
      } `}
    >
      {isMine && (
        <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md text-xs text-gray-400 ">
          <button
            onClick={() => setIsEditing(true)}
            className="cursor-pointer hover:underline h-max hover:text-gray-600 transition"
          >
            <FaPen />
          </button>
          <button
            onClick={handleDelete}
            className="hover:cursor-pointer hover:underline h-max hover:text-gray-600 transition"
          >
            <FaTrash />
          </button>
        </div>
      )}
      <div
        className={`relative max-w-[75%] px-4 py-2 rounded-lg text-sm shadow-sm flex flex-col gap-1 ${
          isMine
            ? "bg-[var(--color-primary)] text-white"
            : "bg-gray-200 text-dark"
        }`}
      >
        {isEditing ? (
          <>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-1 rounded-md text-sm text-white outline-1 outline-white "
              rows={2}
            />
            <div className="flex justify-end gap-2 mt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="text-xs text-gray-300 hover:underline"
              >
                Отмена
              </button>
              <button
                onClick={handleEdit}
                className="text-xs text-white hover:underline"
              >
                Сохранить
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className="text-sm whitespace-pre-wrap break-words">
                {msg.content}
              </div>
              <div className="flex justify-between text-xs text-gray-400 gap-2">
                {msg.updated && <span>изменено</span>}
                <div className="a text-right ">
                  {new Date(msg.created).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

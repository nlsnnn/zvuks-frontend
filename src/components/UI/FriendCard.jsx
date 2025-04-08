export const FriendCard = ({ friend, isSent, onSendRequest, onRemove }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
      <img
        src={friend.avatar}
        alt={friend.name}
        className="w-10 h-10 rounded-full border border-gray-300"
      />
      <div className="flex-1">
        <div className="text-base font-medium text-gray-900">{friend.name}</div>
      </div>

      <div className="flex gap-2">
        {onSendRequest && !isSent && (
          <button
            onClick={() => onSendRequest(friend.id)}
            className="text-sm text-blue-500 border border-blue-500 px-3 py-1 rounded-md hover:bg-blue-50 transition"
          >
            Добавить
          </button>
        )}

        {isSent && (
          <span className="text-sm text-gray-500">Запрос отправлен</span>
        )}

        <button
          onClick={() => onRemove(friend.id)}
          className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

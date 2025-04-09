import { Link } from "react-router-dom";

export const FriendCard = ({ friend, actions = [] }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition max-w-md">
      <img
        src={friend.avatar || "https://via.placeholder.com/40"}
        alt={friend.name}
        className="w-10 h-10 rounded-full border border-gray-300"
      />
      <div className="flex-1">
        <div className="text-base font-medium text-gray-900">{friend.name}</div>
      </div>
      <div className="flex gap-2 items-center">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`text-sm text-${action.color}-500 border border-${action.color}-500 px-3 py-1 rounded-md hover:bg-${action.color}-50 transition ${
              action.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
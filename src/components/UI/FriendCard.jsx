import { Link } from "react-router-dom";

export const FriendCard = ({ friend, actions = [] }) => {
  return (
    <div className="glass-card p-4 flex items-center gap-4 rounded-xl transition hover:shadow-xl">
      <img
        src={friend.avatar}
        alt={friend.username}
        className="w-12 h-12 rounded-full border-2 border-white object-cover"
      />
      <div className="flex-1 ">
        <Link
          to={`/profile/${friend.id}`}
          className="text-lg font-medium text-[var(--color-dark)] truncate hover:text-blue-600 transition"
        >
          {friend.username}
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`text-sm text-${action.color}-500 border border-${
              action.color
            }-500 px-3 py-1 rounded-md hover:bg-${
              action.color
            }-500 transition ${
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

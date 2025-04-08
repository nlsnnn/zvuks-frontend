import { useState } from "react";
import { FriendCard } from "../UI/FriendCard";

const allFriendsMock = [
  { id: 1, name: "Алексей", avatar: "/hamster.jpg" },
  { id: 2, name: "Мария", avatar: "/hamster.jpg" },
  { id: 3, name: "Иван", avatar: "/hamster.jpg" },
  { id: 4, name: "Ольга", avatar: "/hamster.jpg" },
];

export const Friends = () => {
  const [search, setSearch] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [friends, setFriends] = useState(allFriendsMock);

  const handleSendRequest = (id) => {
    setSentRequests((prev) => [...prev, id]);
  };

  const handleRemoveFriend = (id) => {
    setFriends((prev) => prev.filter((f) => f.id !== id));
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Друзья</h1>

      <input
        type="text"
        placeholder="Поиск по имени"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 px-4 py-2 w-full max-w-md rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFriends.map((friend) => (
          <FriendCard
            key={friend.id}
            friend={friend}
            isSent={sentRequests.includes(friend.id)}
            onSendRequest={handleSendRequest}
            onRemove={handleRemoveFriend}
          />
        ))}
      </div>
    </div>
  );
};

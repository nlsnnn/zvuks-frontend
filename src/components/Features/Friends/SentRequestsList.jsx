import { FriendCard } from "../../UI/FriendCard";

export const SentRequestsList = () => {
  const sentRequests = [
    { id: 3, name: "Сергей Сергеев", avatar: "https://via.placeholder.com/40" },
  ];

  const handleCancelRequest = (id) => {
    console.log(`Отменить запрос для id ${id}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Отправленные запросы
      </h2>
      <div className="space-y-2">
        {sentRequests.map((request) => (
          <FriendCard
            key={request.id}
            friend={request}
            isSent={true}
            onRemove={handleCancelRequest}
          />
        ))}
      </div>
    </div>
  );
};

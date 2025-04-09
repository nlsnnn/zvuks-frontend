import { FriendCard } from "../../UI/FriendCard";

export const ReceivedRequestsList = () => {
  const receivedRequests = [
    {
      id: 4,
      name: "Алексей Алексеев",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const handleAcceptRequest = (id) => {
    console.log(`Принять запрос от id ${id}`);
  };

  const handleRejectRequest = (id) => {
    console.log(`Отклонить запрос от id ${id}`);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Полученные запросы
      </h2>
      <div className="space-y-2">
        {receivedRequests.map((request) => (
          <div
            key={request.id}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={request.avatar}
              alt={request.name}
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="flex-1">
              <div className="text-base font-medium text-gray-900">
                {request.name}
              </div>
            </div>
            <button
              onClick={() => handleAcceptRequest(request.id)}
              className="text-sm text-green-500 border border-green-500 px-3 py-1 rounded-md hover:bg-green-50 transition"
            >
              Принять
            </button>
            <button
              onClick={() => handleRejectRequest(request.id)}
              className="text-sm text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition"
            >
              Отклонить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

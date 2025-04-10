import { useEffect } from "react";
import { FriendCard } from "../../UI/FriendCard";
import { friendStore } from "../../../store/friendStore";
import { observer } from "mobx-react-lite";

export const SentRequestsList = observer(() => {
  useEffect(() => {
    friendStore.getSended();
  }, []);

  if (friendStore.loading)
    return <div className="text-center">Загрузка...</div>;
  if (friendStore.error)
    return <div className="text-red-500 text-center">{friendStore.error}</div>;
  if (!friendStore.sended.length)
    return (
      <div className="text-center text-gray-500">
        У вас нет отправленных запросов
      </div>
    );

  const handleCancelRequest = (id) => {
    console.log(`Отменить запрос для id ${id}`);
  };

  return (
    <div>
      <div className="space-y-2">
        {friendStore.sended.map((request) => (
          <FriendCard
            key={request.id}
            friend={request}
            actions={[
              {
                label: "Отменить запрос",
                color: "red",
                onClick: () => handleCancelRequest(request.id),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
});

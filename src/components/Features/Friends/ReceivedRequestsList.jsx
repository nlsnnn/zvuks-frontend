import { useEffect } from "react";
import { FriendCard } from "../../UI/FriendCard";
import { friendStore } from "../../../store/friendStore";
import { observer } from "mobx-react-lite";

export const ReceivedRequestsList = observer(() => {
  useEffect(() => {
    friendStore.getPending();
  }, []);

  if (friendStore.loading)
    return <div className="text-center">Загрузка...</div>;
  if (friendStore.error)
    return <div className="text-red-500 text-center">{friendStore.error}</div>;
  if (!friendStore.pending.length)
    return (
      <div className="text-center text-gray-500">
        У вас нет запросов в друзья
      </div>
    );

  return (
    <div>
      <div className="space-y-2">
        {friendStore.pending.map((request) => (
          <FriendCard
            key={request.id}
            friend={request}
            actions={[
              {
                label: "Принять",
                color: "green",
                onClick: () => friendStore.acceptRequest(request.id),
              },
              {
                label: "Отклонить",
                color: "red",
                onClick: () => friendStore.rejectRequest(request.id),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
});

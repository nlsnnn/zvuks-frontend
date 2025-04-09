import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { friendStore } from "../../../store/friendStore";
import { FriendCard } from "../../UI/FriendCard";

export const FriendsList = observer(() => {
  useEffect(() => {
    friendStore.getFriends();
  }, []);

  if (friendStore.loading) return <div className="text-center">Загрузка...</div>;
  if (friendStore.error) return <div className="text-red-500 text-center">{friendStore.error}</div>;
  if (!friendStore.friends.length) return <div className="text-center text-gray-500">У вас нет друзей</div>;

  return (
    <div className="space-y-2">
      {friendStore.friends.map((friend) => (
        <FriendCard
          key={friend.id}
          friend={friend}
          actions={[
            { label: "Написать", color: "blue", onClick: () => console.log(`Сообщение ${friend.id}`) },
            { label: "Удалить", color: "red", onClick: () => friendStore.deleteFriend(friend.id) },
          ]}
        />
      ))}
    </div>
  );
});
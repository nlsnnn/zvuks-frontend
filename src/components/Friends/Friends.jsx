import { useEffect, useState } from "react";
import { friendStore } from "../../store/friendStore";
import { FriendCard } from "./FriendCard/FriendCard";
import { observer } from "mobx-react-lite";

export const Friends = observer(({ type }) => {
  const [noList, setNoList] = useState('');

  useEffect(() => {
    if (type == 'my') {
      friendStore.getFriends();
      setNoList('У вас нет друзей!');
    } else if (type == 'sended') {
      friendStore.getSended();
      setNoList('У вас нет исходящих заявок в друзья!');
    } else if (type == 'pending') {
      friendStore.getPending();
      setNoList('У вас нет запросов в друзья!');
    } else if (type == 'global') {
      setNoList('Введите имя пользователя');
    }
  }, [type]);

  useEffect(() => {
    if (type == "global" && friendStore.friends && friendStore.friends.length === 0) {
      setNoList("Ничего не найдено")
    }
  }, [friendStore.friends, type])

  return (
    <div className="flex flex-wrap justify-center md:justify-normal gap-12 mt-6">
      {friendStore.friends && friendStore.friends.map((friend) => (
        <FriendCard
          type={type}
          username={friend.username}
          picturePath="test"
          key={friend.id}
          id={friend.id}
        />
      ))}
      {!friendStore.friends.length && (
        <h2 className="text-4xl font-bold">{noList}</h2>
      )}
    </div>
  );
});



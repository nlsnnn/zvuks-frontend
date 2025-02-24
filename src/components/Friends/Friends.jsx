import { useEffect, useState } from "react";
import { friendStore } from "../../store/friendStore";
import { FriendCard } from "./FriendCard/FriendCard";
import { observer } from "mobx-react-lite";

export const Friends = observer(({ type }) => {

  useEffect(() => {
    if (type == 'my') {
      friendStore.getFriends();
    } else if (type == 'sended') {
      friendStore.getSended();
    } else if (type == 'pending') {
      friendStore.getPending();
    }
  }, [type]);

  return (
    <div className="flex flex-wrap justify-center md:justify-normal gap-12 mt-6">
      {friendStore.friends && friendStore.friends.map((friend) => (
        <FriendCard
          type={type}
          username={friend.username}
          picturePath="test"
          key={friend.id}
        />
      ))}
      {!friendStore.friends.length && (
        <h2 className="text-4xl font-bold">У вас нет друзей!</h2>
      )}
    </div>
  );
});



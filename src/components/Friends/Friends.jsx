import { useEffect, useState } from "react";
import { friendStore } from "../../store/friendStore";
import { FriendCard } from "./FriendCard/FriendCard";
import { observer } from "mobx-react-lite";

export const Friends = observer(() => {
  useEffect(() => {
    friendStore.getFriends();
  }, []);

  return (
    <div className="flex flex-wrap justify-center md:justify-normal gap-12 mt-6">
      {friendStore.friends.map((friend) => (
        <FriendCard
          username={friend.username}
          picturePath="test"
          key={friend.id}
        />
      ))}
    </div>
  );
});

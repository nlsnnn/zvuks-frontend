import { useEffect } from "react";
import { friendStore } from "../../store/friendStore";
import { Contact } from "./Contact";
import { observer } from "mobx-react-lite";

export const Contacts = observer(() => {
  useEffect(() => {
    friendStore.getFriends();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:justify-normal gap-3 flex-wrap lg:items-start w-full lg:w-1/6 ">
        {friendStore.friends &&
          friendStore.friends.map((friend) => (
            <Contact username={friend.username} key={friend.id} id={friend.id} avatar={friend.avatar} />
          ))}
        {!friendStore.friends.length && (
          <h2 className="text-4xl font-bold">Нет контактов</h2>
        )}
      </div>
    </>
  );
});

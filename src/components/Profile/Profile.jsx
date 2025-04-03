import { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import { Header } from "../Header/Header";
import { observer } from "mobx-react-lite";

export const Profile = observer(({ id }) => {
  useEffect(() => {
    const getProfile = async () => {
      await userStore.getProfile(id);
    };

    getProfile();
  }, [id]);

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        {userStore.userProfile && (
          <>
            <div className="flex gap-6">
              <img
                src="/hamster.jpg"
                alt={userStore.userProfile.username}
                className="w-90 h-80 rounded-4xl"
              />
              <div className="flex flex-col">
                <h2 className="text-4xl font-semibold">{userStore.userProfile.username}</h2>
              </div>
            </div>
          </>
        )}
        {!userStore.userProfile && <h2>Загрузка</h2>}
      </main>
    </>
  );
});

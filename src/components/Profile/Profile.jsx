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
                src={userStore.userProfile.avatar}
                alt={userStore.userProfile.username}
                className="w-80 h-80 rounded-4xl"
              />
              <div className="flex h-max items-center gap-8">
                <div className="flex flex-col">
                  <h2 className="text-4xl font-semibold">
                    {userStore.userProfile.username}
                  </h2>
                </div>

                {userStore.userProfile.id === userStore.user.id && (
                  <>
                    <div>
                      <span>Изменить</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
        {!userStore.userProfile && <h2>Загрузка</h2>}
      </main>
    </>
  );
});

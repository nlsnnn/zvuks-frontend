import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useEffect } from "react";

export const Profile = observer(() => {
  const { userId } = useParams();
  const isOwnProfile = userId === userStore.user?.userId;

  useEffect(() => {
    if (userId) {
      userStore.getProfile(userId);
    }
  }, [userId]);

  const user = userStore.userProfile || {};
  const songs = userStore.userProfile.songs || [];

  if (userStore.loading) return <div className="text-center">Загрузка...</div>;
  if (userStore.error)
    return <div className="text-red-500 text-center">{userStore.error}</div>;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-32 h-32 rounded-full border border-gray-300 mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold text-gray-900">
              {user.username || "Пользователь"}
            </h2>

            {isOwnProfile && (
              <Link
                to="/profile/edit"
                className="mt-4 text-blue-600 hover:underline"
              >
                Редактировать профиль
              </Link>
            )}
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Топ песен
            </h3>
            {songs.length && (
                <div className="space-y-4">
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

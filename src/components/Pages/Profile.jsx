import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useEffect } from "react";

export const Profile = observer(() => {
  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      userStore.getProfile(userId);
    }
  }, [userId]);

  const user = userStore.userProfile || {};
  const songs = userStore.userProfile?.songs || [];

  if (userStore.loading) return <div className="text-center">Загрузка...</div>;
  if (userStore.error)
    return <div className="text-red-500 text-center">{userStore.error}</div>;

  return (
    <>
      <div className="w-full h-full  p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-32 h-32 rounded-full border border-gray-300 mb-4 object-cover"
          />
          <h2 className="text-2xl font-bold text-gray-900">
            {user.username || "Пользователь"}
          </h2>
          {user.id == userId && (
            <Link
              to="/profile/edit"
              className="mt-4 text-blue-600 hover:underline"
            >
              Редактировать профиль
            </Link>
          )}
        </div>

        <div className="mt-8">
          {songs.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Топ песен
              </h3>
              <div className="space-y-4">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        {song.title}
                      </div>
                      <div className="text-gray-600">{song.artist}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {!songs.length && (
            <p className="text-gray-500 text-center">Песни не добавлены</p>
          )}
        </div>
      </div>
    </>
  );
});

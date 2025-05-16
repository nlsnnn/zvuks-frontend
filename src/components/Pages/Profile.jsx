import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { useEffect } from "react";
import { adminStore } from "../../store/adminStore";
import { toast } from "react-toastify";
import { adminCheckProfile } from "../../utils";

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

  const handleBlock = async () => {
    const res = await adminStore.blockUser(userId);
    if (res) {
      user.blocked = true;
      toast.success(`Пользователь ${user.username} заблокирован`);
    }
  };

  const handleUnblock = async () => {
    const res = await adminStore.unblockUser(userId);
    if (res) {
      user.blocked = false;
      toast.success(`Пользователь ${user.username} разблокирован`);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-32 h-32 rounded-full border-4 border-white mb-6 object-cover"
        />
        <h2 className="text-2xl font-bold text-[var(--color-dark)]">
          {user.username || "Пользователь"}
        </h2>
        <p className="text-gray-700 text-center mt-2">
          {user.bio || "Пользователь не добавил описание"}
        </p>
        {userStore.user.id == userId && (
          <Link
            to="/profile/edit"
            className="mt-4 text-[var(--color-primary)] hover:underline"
          >
            Редактировать профиль
          </Link>
        )}
        {!adminCheckProfile(user, userStore.user) && (
          <button
            className="btn-primary bg-red-500 hover:bg-red-600 cursor-pointer mt-4"
            onClick={handleBlock}
          >
            Заблокировать пользователя
          </button>
        )}
        {adminCheckProfile(user, userStore.user) && (
          <button
            className="btn-primary bg-green-500 hover:bg-green-600 cursor-pointer mt-4"
            onClick={handleUnblock}
          >
            Разблокировать пользователя
          </button>
        )}
      </div>

      <div className="mt-8">
        {songs.length > 0 && (
          <>
            <h3 className="text-xl font-semibold text-[var(--color-dark)] mb-4 px-2">
              Топ песен
            </h3>
            <div className="space-y-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="glass-card flex items-center gap-4 p-4 rounded-xl transition hover:shadow-xl"
                >
                  <img
                    src={song.cover}
                    alt={song.title}
                    className="w-16 h-16 object-cover rounded-md shadow-md"
                  />
                  <div>
                    <div className="text-lg font-medium text-[var(--color-dark)]">
                      {song.title}
                    </div>
                    <div className="text-sm text-[var(--color-muted)]">
                      {song.artists.map((artist) => artist.username).join(", ")}
                    </div>
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
    </>
  );
});

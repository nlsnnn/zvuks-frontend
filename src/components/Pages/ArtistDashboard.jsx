import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { artistStore } from "../../store/artistStore";
import { Link } from "react-router-dom";

export const ArtistDashboard = observer(() => {
  useEffect(() => {
    artistStore.fetchMySongs();
    artistStore.fetchMyAlbums();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-dark">Панель артиста</h1>

      <section>
        <h2 className="text-xl font-semibold mb-4">Мои песни</h2>
        {artistStore.mySongs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistStore.mySongs.map((song) => (
              <div key={song.id} className="glass-card p-4">
                <h3 className="text-lg font-semibold">{song.title}</h3>
                <p className="text-muted">
                  {song.artists.map((a) => a.username).join(", ")}
                </p>
                <Link
                  to={`/artist/songs/${song.id}`}
                  className="text-primary text-sm hover:underline"
                >
                  Посмотреть статистику
                </Link>
              </div>
            ))}
          </div>
        )}
        {artistStore.mySongs.length === 0 && <h3>У вас нет песен</h3>}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Мои альбомы</h2>
        {artistStore.myAlbums && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {artistStore.myAlbums.map((album) => (
              <div key={album.id} className="glass-card p-4">
                <h3 className="text-lg font-semibold">{album.title}</h3>
                {/* <p className="text-muted">{album.songs.length} треков</p> */}
                <Link
                  to={`/artist/albums/${album.id}`}
                  className="text-primary text-sm hover:underline"
                >
                  Посмотреть статистику
                </Link>
              </div>
            ))}
          </div>
        )}
        {artistStore.myAlbums.length === 0 && <h3>У вас нет альбомов</h3>}
      </section>
    </div>
  );
});

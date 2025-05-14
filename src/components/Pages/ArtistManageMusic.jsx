import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { artistStore } from "../../store/artistStore";
import { useNavigate, Link } from "react-router-dom";

export const ArtistManageMusic = observer(() => {
  const [songSearch, setSongSearch] = useState("");
  const [albumSearch, setAlbumSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    artistStore.fetchMySongs();
    artistStore.fetchMyAlbums();
  }, []);

  const filteredSongs = artistStore.mySongs.filter((song) =>
    song.title.toLowerCase().includes(songSearch.toLowerCase())
  );

  const filteredAlbums = artistStore.myAlbums.filter((album) =>
    album.title.toLowerCase().includes(albumSearch.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-dark">Управление музыкой</h1>

      <div className="flex flex-wrap gap-4">
        <button onClick={() => navigate("/songs/add")} className="btn-primary">
          + Добавить песню
        </button>
        <button onClick={() => navigate("/albums/add")} className="btn-primary">
          + Добавить альбом
        </button>
      </div>

      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Мои песни</h2>
          <input
            type="text"
            placeholder="Поиск по названию песни..."
            value={songSearch}
            onChange={(e) => setSongSearch(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:w-80"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSongs.map((song) => {
            const isArchived = song.archive;

            return (
              <div key={song.id} className="glass-card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  {isArchived && <h3 className="text-lg text-muted">СКРЫТО</h3>}
                </div>
                <p className="text-muted">
                  {song.artists.map((a) => a.username).join(", ")}
                </p>
                <div className="flex gap-3">
                  <Link
                    to={`/artist/songs/${song.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    Статистика
                  </Link>
                  {isArchived ? (
                    <button
                      className="text-sm text-green-500 hover:underline cursor-pointer"
                      onClick={() => artistStore.unarchiveSong(song.id)}
                    >
                      Восстановить
                    </button>
                  ) : (
                    <button
                      className="text-sm text-red-500 hover:underline cursor-pointer"
                      onClick={() => artistStore.archiveSong(song.id)}
                    >
                      Скрыть
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {filteredSongs.length === 0 && (
            <p className="text-muted col-span-full">Ничего не найдено</p>
          )}
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-xl font-semibold">Мои альбомы</h2>
          <input
            type="text"
            placeholder="Поиск по названию альбома..."
            value={albumSearch}
            onChange={(e) => setAlbumSearch(e.target.value)}
            className="border px-3 py-2 rounded-md w-full md:w-80"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlbums.map((album) => (
            <div key={album.id} className="glass-card p-4 space-y-2">
              <h3 className="text-lg font-semibold">{album.title}</h3>
              {/* <p className="text-muted">{album.songs.length} треков</p> */}
              <div className="flex gap-3">
                <Link
                  to={`/artist/albums/${album.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  Статистика
                </Link>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => alert("TODO: редактирование альбома")}
                >
                  Редактировать
                </button>
              </div>
            </div>
          ))}
          {filteredAlbums.length === 0 && (
            <p className="text-muted col-span-full">Ничего не найдено</p>
          )}
        </div>
      </section>
    </div>
  );
});

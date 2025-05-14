import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { artistStore } from "../../store/artistStore";
import { Link } from "react-router-dom";
import { ArtistDashboardBanner } from "../Features/Artist/ArtistDashboardBanner";

export const ArtistDashboard = observer(() => {
  const [songSearch, setSongSearch] = useState("");
  const [albumSearch, setAlbumSearch] = useState("");

  useEffect(() => {
    artistStore.fetchMySongs();
    artistStore.fetchMyAlbums();
    artistStore.fetchDashboard();
  }, []);

  const filteredSongs = artistStore.mySongs.filter((song) =>
    song.title.toLowerCase().includes(songSearch.toLowerCase())
  );

  const filteredAlbums = artistStore.myAlbums.filter((album) =>
    album.title.toLowerCase().includes(albumSearch.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold text-dark">Панель артиста</h1>

      {artistStore.dashboard && (
        <ArtistDashboardBanner dashboard={artistStore.dashboard} />
      )}

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
          {filteredSongs.map((song) => (
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
          {filteredAlbums.length === 0 && (
            <p className="text-muted col-span-full">Ничего не найдено</p>
          )}
        </div>
      </section>
    </div>
  );
});

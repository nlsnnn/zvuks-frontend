import { useEffect } from "react";
import { favoriteStore } from "../../store/favoriteStore";
import { observer } from "mobx-react-lite";
import { AlbumSong } from "../AlbumSongs/AlbumSong";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";

export const FavoriteSongs = observer(() => {
  useEffect(() => {
    favoriteStore.getSongs();
  }, []);

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        <div className="flex gap-2 items-center ">
          <h2 className="text-2xl font-semibold">Мои треки</h2>
          <Link to="/favorite/albums">Мои альбомы</Link>
        </div>
        <div className="mt-4 flex flex-col gap-2 ">
          {favoriteStore.songs.length > 0 &&
            favoriteStore.songs.map((song, index) => (
              <AlbumSong key={index} song={song} index={index} />
            ))}
          {favoriteStore.songs.length == 0 && (
            <h2>У вас нет избранных песен!</h2>
          )}
        </div>
      </main>
    </>
  );
});

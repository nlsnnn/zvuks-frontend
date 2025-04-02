import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { favoriteStore } from "../../store/favoriteStore";
import { AlbumCard } from "../Albums/components/AlbumCard";
import { Header } from "../Header/Header";
import { Link } from "react-router-dom";

export const FavoriteAlbums = observer(() => {
  useEffect(() => {
    favoriteStore.getAlbums();
  }, []);

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        <div className="flex gap-2 items-center ">
          <h2 className="text-2xl font-semibold">Мои альбомы</h2>
          <Link to="/favorite/songs">Мои треки</Link>
        </div>
        <div className="mt-4 flex flex-wrap justify-items-start gap-6 ">
          {favoriteStore.albums.map((album) => (
            <AlbumCard
              id={album.id}
              cover={album.cover_path}
              name={album.name}
            />
          ))}
        </div>
      </main>
    </>
  );
});

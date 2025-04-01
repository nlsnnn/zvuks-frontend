import { useEffect } from "react";
import { Header } from "../../Header/Header";
import { favoriteStore } from "../../../store/favoriteStore";

export const FavoriteSongs = () => {
  useEffect(() => {
    favoriteStore.getSongs();
  }, [favoriteStore.songs]);

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        <div className="flex flex-col gap-2 ">
          {favoriteStore.songs.map((album, index) => (
            <AlbumSong
              key={album.id}
              index={index}
              cover={album.cover_path}
              name={album.name}
              artists={album.authors}
            />
          ))}
        </div>
      </main>
    </>
  );
};

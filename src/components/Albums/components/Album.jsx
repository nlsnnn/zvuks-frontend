import { useEffect } from "react";
import { albumStore } from "../../../store/albumStore";
import { observer } from "mobx-react-lite";
import { AlbumSongs } from "../../AlbumSongs/AlbumSongs";
import { Header } from "../../Header/Header";

export const Album = observer((albumId) => {
  useEffect(() => {
    if (!albumId) return;
    albumStore.getAlbum(albumId);
    albumStore.getAlbumSongs(albumId);
  }, [albumId]);

  if (!albumStore.album) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="flex ">
          <img
            src={albumStore.album?.cover_path}
            alt={albumStore.album?.name}
            className="w-50 h-50 rounded"
          />
          <h2>{albumStore.album?.name}</h2>
        </div>
        <AlbumSongs />
      </main>
    </>
  );
});

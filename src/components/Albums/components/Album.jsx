import { useEffect } from "react";
import { albumStore } from "../../../store/albumStore";
import { observer } from "mobx-react-lite";
import { AlbumSongs } from "../../AlbumSongs/AlbumSongs";
import { Header } from "../../Header/Header";

export const Album = observer(({ albumId }) => {
  useEffect(() => {
    if (!albumId) return;
    albumStore.getAlbum(albumId);
  }, [albumId]);

  if (!albumStore.album) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="flex gap-4 items-center mb-8">
          <img
            src={albumStore.album?.cover_path}
            alt={albumStore.album?.name}
            className="w-48 h-48 rounded object-cover"
          />
          <h2 className="text-3xl font-bold">{albumStore.album?.name}</h2>
        </div>
        <AlbumSongs albumId={albumId} />
      </main>
    </>
  );
});

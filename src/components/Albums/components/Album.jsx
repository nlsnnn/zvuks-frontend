import { useEffect } from "react";
import { albumStore } from "../../../store/albumStore";
import { observer } from "mobx-react-lite";
import { AlbumSongs } from "../../AlbumSongs/AlbumSongs";
import { Header } from "../../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { favoriteStore } from "../../../store/favoriteStore"

export const Album = observer(({ albumId }) => {
  useEffect(() => {
    if (!albumId) return;
    albumStore.getAlbum(albumId);
  }, [albumId]);

  if (!albumStore.album) {
    return <div>Загрузка...</div>;
  }

  const handleHeartClick = async () => {
    await favoriteStore.addAlbum(albumId)
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
          <div>
            <h2 className="text-3xl font-bold">{albumStore.album?.name}</h2>
            <FontAwesomeIcon
              icon={faHeart}
              className="hover:text-red-500 transition cursor-pointer"
              onClick={handleHeartClick}
            />
          </div>
        </div>
        <AlbumSongs albumId={albumId} />
      </main>
    </>
  );
});

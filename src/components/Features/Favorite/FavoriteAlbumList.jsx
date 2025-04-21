import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { favoriteStore } from "../../../store/favoriteStore";
import { AlbumCard } from "../../UI/AlbumCard";

export const FavoriteAlbumList = observer(() => {
  useEffect(() => {
    favoriteStore.getAlbums();
  }, []);

  if (!favoriteStore.albums?.length) {
    return <p className="text-muted">У вас пока нет любимых альбомов</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favoriteStore.albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
});

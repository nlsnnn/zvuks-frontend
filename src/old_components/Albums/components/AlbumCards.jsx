import { useEffect } from "react";
import { albumStore } from "../../../store/albumStore";
import { AlbumCard } from "./AlbumCard";
import { observer } from "mobx-react-lite";

export const AlbumCards = observer(() => {
  useEffect(() => {
    albumStore.getAlbums();
  }, []);

  return (
    <>
      <div className="flex gap-4 items-center">
        {albumStore.albums.length > 0 &&
          albumStore.albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              name={album.name}
              cover={album.cover_path}
            />
          ))}
      </div>
    </>
  );
});

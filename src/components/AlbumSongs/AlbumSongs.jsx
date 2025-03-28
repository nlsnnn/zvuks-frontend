import { albumStore } from "../../store/albumStore";
import { AlbumSong } from "./AlbumSong";

export const AlbumSongs = () => {
  return (
    <>
      <div className="flex flex-col gap-2 ">
        {albumStore.albumSongs.map((album) => (
          <AlbumSong
            key={album.id}
            cover={album.cover_path}
            name={album.name}
            artists={album.authors}
          />
        ))}
      </div>
    </>
  );
};

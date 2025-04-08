import { useEffect } from "react";
import { albumStore } from "../../store/albumStore";
import { AlbumSong } from "./AlbumSong";
import { observer } from "mobx-react-lite";
import { songStore } from "../../store/songStore";

export const AlbumSongs = observer(({ albumId }) => {
  useEffect(() => {
    albumStore.getAlbumSongs(albumId).then(() => {
      songStore.loadOtherSongs(albumStore.albumSongs);
    });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2 ">
        {albumStore.albumSongs.map((song, index) => (
          <AlbumSong
            key={song.id}
            index={index}
            song={song}
          />
        ))}
      </div>
    </>
  );
});

import { useEffect } from "react";
import { songStore } from "../../../store/songStore";
import { SongCard } from "../../UI/SongCard";
import { observer } from "mobx-react-lite";

export const SongList = observer(() => {
  useEffect(() => {
    songStore.getSongs();
  }, []);

  if (!songStore.songs.length) {
    return <div className="text-center text-[var(--color-muted)]">Песен пока нет</div>;
  }

  return (
    <div className="space-y-4">
      {songStore.songs.map((song) => (
        <SongCard
          key={song.id}
          song={song}
          isPlaying={
            songStore.currentSongIndex === songStore.songs.indexOf(song) &&
            songStore.isPlaying
          }
        />
      ))}
    </div>
  );
});

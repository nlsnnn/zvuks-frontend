import { useEffect } from "react";
import { favoriteStore } from "../../../store/favoriteStore";
import { SongCard } from "../../UI/SongCard";
import { songStore } from "../../../store/songStore";
import { observer } from "mobx-react-lite";

export const FavoriteSongList = observer(() => {
  useEffect(() => {
    favoriteStore.getSongs().then(() => {
      songStore.loadOtherSongs(favoriteStore.songs);
    });
  }, []);

  if (!favoriteStore.songs.length) {
    return <p className="text-muted">У вас пока нет любимых песен</p>;
  }

  return (
    <div className="space-y-4">
      {favoriteStore.songs.map((song, index) => (
        <SongCard
          key={song.id}
          song={song}
          isPlaying={
            songStore.currentSongIndex === index && songStore.isPlaying
          }
        />
      ))}
    </div>
  );
});

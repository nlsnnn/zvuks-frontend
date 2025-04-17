import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { albumStore } from "../../store/albumStore";
import { SongCard } from "../../components/UI/SongCard";
import { songStore } from "../../store/songStore";

export const Album = observer(() => {
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) {
      albumStore.getAlbum(albumId);
      albumStore.getAlbumSongs(albumId);
    }
  }, [albumId]);

  const album = albumStore.album;
  const songs = albumStore.albumSongs;

  if (albumStore.loading) {
    return <div className="text-center">Загрузка...</div>;
  }

  if (albumStore.error) {
    return <div className="text-red-500 text-center">{albumStore.error}</div>;
  }

  return (
    <div className="p-8">
      <div className="glass-card p-8 flex items-center gap-6 rounded-xl shadow-lg mb-8">
        <img
          src={album.cover}
          alt={album.title}
          className="w-40 h-40 object-cover rounded-lg shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold text-[var(--color-dark)]">
            {album.title}
          </h2>
          <p className="text-xl text-[var(--color-muted)]">{album.artist}</p>
          <p className="text-sm text-[var(--color-muted)] mt-2">
            {album.releaseDate}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-[var(--color-dark)] mb-4">
          Песни в альбоме
        </h3>
        <div className="space-y-4">
          {songs.map((song) => (
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
      </div>
    </div>
  );
});

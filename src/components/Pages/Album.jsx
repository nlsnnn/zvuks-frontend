import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { albumStore } from "../../store/albumStore";
import { SongCard } from "../../components/UI/SongCard";
import { songStore } from "../../store/songStore";
import { formatDate } from "../../utils";
import { FaHeart } from "react-icons/fa";
import { favoriteStore } from "../../store/favoriteStore";

export const Album = observer(() => {
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) {
      albumStore.getAlbum(albumId);
      albumStore.getAlbumSongs(albumId).then(() => {
        songStore.loadOtherSongs(albumStore.albumSongs);
      });
    }
  }, [albumId]);

  const album = albumStore.album;
  const songs = albumStore.albumSongs;

  if (albumStore.loading || !album) {
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
        <div className="flex justify-between w-full items-center flex-wrap gap-2">
          <div>
            <h2 className="md:text-3xl text-lg font-bold text-dark">
              {album.title}
            </h2>
            <Link
              to={`/profile/${album.artist.id}`}
              className="md:text-xl text-muted w-full hover:text-[var(--color-primary)] transition"
            >
              {album.artist.username}
            </Link>
            <p className="text-sm text-muted mt-2">
              {formatDate(album.releaseDate)}
            </p>
          </div>
          <div>
            <button
              className={`p-2 rounded-full transition cursor-pointer ${
                album.favorite
                  ? "bg-red-100 text-red-500 hover:text-red-400 hover:bg-red-50"
                  : "text-gray-400 hover:text-red-400 hover:bg-red-50"
              }`}
              onClick={() => favoriteStore.toggleAlbum(album)}
            >
              <FaHeart />
            </button>
          </div>
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

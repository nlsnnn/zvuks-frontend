import { Link } from "react-router-dom";
import { FaPlay, FaHeart, FaStop } from "react-icons/fa";
import { songStore } from "../../store/songStore";
import { favoriteStore } from "../../store/favoriteStore";
import { observer } from "mobx-react-lite";

export const SongCard = observer(({ song, isPlaying }) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
    songStore.playSong(songStore.songs.indexOf(song));
  };

  const onFavorite = (e) => {
    e.stopPropagation();
    favoriteStore.toggleSong(song);
  };

  return (
    <div
      className="glass-card p-4 flex items-center gap-4 transition hover:shadow-xl  cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={song.cover}
        alt={song.title}
        className="w-16 h-16 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1 min-w-0">
        <div className="text-lg font-semibold text-[var(--color-dark)] truncate">
          {song.title}
        </div>
        <div className="text-sm text-[var(--color-muted)] truncate flex gap-2">
          {song.artists.map((artist, i) => (
            <div key={artist.id}>
              <p
                className="hover:text-[var(--color-primary)] transition"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Link to={`/profile/${artist.id}`}>
                  {artist.username}
                  {i < song.artists.length - 1 && (
                    <span className="text-gray-400">,</span>
                  )}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={(e) => {
            handleCardClick(e);
          }}
          className={`p-2 rounded-full transition shadow ${
            isPlaying
              ? "bg-[var(--color-primary)] text-white"
              : "bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white"
          }`}
        >
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <button
          onClick={(e) => {
            onFavorite(e);
          }}
          className={`p-2 rounded-full transition shadow ${
            song.favorite
              ? "text-red-500 hover:text-red-400 bg-red-50"
              : "text-gray-400 hover:text-red-500 bg-white"
          }`}
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
});

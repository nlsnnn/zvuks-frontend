import { Link } from "react-router-dom";
import { FaPlay, FaHeart, FaStop } from "react-icons/fa";
import { songStore } from "../../store/songStore";
import { favoriteStore } from "../../store/favoriteStore";
import { observer } from "mobx-react-lite";

const getSongsByType = (type) => {
  switch (type) {
    case "new":
      return songStore.newSongs;
    case "popular":
      return songStore.popularSongs;
    case "liked":
      return songStore.mostLikedSongs;
    default:
      return songStore.songs;
  }
};

export const SongCard = observer(({ song, isPlaying, type = "songs" }) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
    const songs = getSongsByType(type);
    songStore.songs = songs;
    songStore.playSong(songs.indexOf(song));
  };

  const onFavorite = (e) => {
    e.stopPropagation();
    favoriteStore.toggleSong(song);
  };

  return (
    <div
      className="glass-card p-4 flex items-center gap-4 transition hover:shadow-xl cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={song.cover}
        alt={song.title}
        className="hidden sm:block sm:w-4 sm:h-4 lg:w-8 lg:h-8 xl:w-16 xl:h-16 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1 min-w-0">
        <div className="text-sm lg:text-base xl:text-lg font-semibold text-[var(--color-dark)] truncate">
          {song.title}
        </div>
        <div className="text-sm text-[var(--color-muted)] truncate flex gap-2">
          {song.artists.map((artist, i) => (
            <div key={artist.id}>
              <p
                className="text-xs lg:text-base hover:text-[var(--color-primary)] transition"
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
          className={`hidden 2xl:block p-2 rounded-full transition shadow ${
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
          className={`hidden 2xl:block p-2 rounded-full transition shadow ${
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

import { Link } from "react-router-dom";
import { FaPlay, FaHeart, FaStop } from "react-icons/fa";
import { songStore } from "../../store/songStore";
import { favoriteStore } from "../../store/favoriteStore";

export const SongCard = ({ song, isPlaying }) => {
  const handleCardClick = (e) => {
    e.stopPropagation();
    songStore.playSong(songStore.songs.indexOf(song));
  };

  const onFavorite = (e) => {
    e.stopPropagation();
    if (song.favorite) {
      favoriteStore.removeSong(song.id);
    } else {
      favoriteStore.addSong(song.id);
    }
  };

  return (
    <div
      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={song.cover}
        alt={song.title}
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="flex-1 min-w-0">
        <div className="text-lg font-medium text-gray-900 truncate">
          {song.title}
        </div>
        <div className="text-sm text-gray-600 truncate flex gap-2">
          {song.artists.map((artist) => (
            <p
              className="hover:text-blue-600 cursor-pointer w-max"
              key={artist.id}
            >
              <Link to={`/profile/${artist.id}`}>{artist.username}</Link>
            </p>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={(e) => {
            handleCardClick(e);
          }}
          className={`p-2 rounded-full ${
            isPlaying
              ? "bg-blue-100 text-blue-600"
              : "text-blue-500 hover:text-blue-700"
          } transition-colors`}
        >
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <button
          onClick={(e) => {
            onFavorite(e);
          }}
          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaHeart />
        </button>
      </div>
    </div>
  );
};

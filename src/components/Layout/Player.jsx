import { FaPlay, FaForward, FaBackward, FaHeart, FaStop } from "react-icons/fa";
import { songStore } from "../../store/songStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { favoriteStore } from "../../store/favoriteStore";

export const Player = observer(() => {
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(15, 19);
  };

  const song = songStore.currentSong;

  const onFavorite = () => {
    if (song.favorite) {
      favoriteStore.removeSong(song.id);
    } else {
      favoriteStore.addSong(song.id);
    }
  };

  return (
    <>
      {song && (
        <footer className="fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 px-4 md:px-6 flex items-center justify-between shadow-md flex-nowrap sm:flex-wrap gap-y-2">
          {/* Левая часть */}
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <img
              src={song.cover}
              alt={song.title}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="text-sm">
              <div className="font-medium text-gray-900">{song.title}</div>
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
          </div>

          {/* Центр */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center gap-4">
              <button
                className="text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => songStore.playPrevious()}
              >
                <FaBackward />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white cursor-pointer"
                onClick={() => songStore.togglePlay()}
              >
                {songStore.isPlaying ? <FaStop /> : <FaPlay />}
              </button>
              <button
                className="text-gray-700 hover:text-blue-600 cursor-pointer"
                onClick={() => songStore.playNext()}
              >
                <FaForward />
              </button>
            </div>
            <div className="w-full items-center space-x-2.5 justify-center text-gray-600 hidden sm:flex">
              <span>{formatTime(songStore.currentTime)}</span>
              <input
                type="range"
                className="w-full max-w-xs h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                min={0}
                max={songStore.duration || 0}
                value={songStore.currentTime}
                onChange={(e) => songStore.seek(parseFloat(e.target.value))}
              />
              <span>{formatTime(songStore.duration)}</span>
            </div>
          </div>

          {/* Правая часть */}
          <div className="hidden sm:flex items-center gap-4 w-full sm:w-auto justify-end">
            <button
              className={`cursor-pointer ${
                song.favorite
                  ? "text-red-500 hover:text-gray-500"
                  : "text-gray-500 hover:text-red-500"
              }`}
              onClick={() => onFavorite()}
            >
              <FaHeart />
            </button>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={100}
              onChange={(e) => songStore.setVolume(e.target.value)}
              className="h-1 w-24 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </footer>
      )}
    </>
  );
});

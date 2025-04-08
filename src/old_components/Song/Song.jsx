import { observer } from "mobx-react-lite";
import { songStore } from "../../store/songStore";
import { FavoriteSongIcons } from "../FavoriteIcons/FavoriteSongIcons";
import { Link } from "react-router-dom";

export const Song = observer(({ song, index }) => {
  const isActive = songStore.currentSongIndex === index;

  const handleClick = () => {
    songStore.playSong(index);
  };

  return (
    <div
      onClick={handleClick}
      className={
        isActive
          ? "flex justify-between items-center transition rounded-lg w-60 cursor-pointer bg-blue-300 hover:bg-blue-400"
          : "flex justify-between items-center transition rounded-lg w-60 cursor-pointer bg-gray-200 hover:bg-gray-300"
      }
    >
      <img
        src={song.cover_path}
        className="w-16 h-16 rounded-l-lg"
        alt="Обложка"
      />
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 font-medium text-xs">
          {song.artists.map((artist) => (
            <p className="text-gray-500 hover:text-blue-600 cursor-pointer w-max">
              <Link to={`/user/${artist.id}`}>{artist.username}</Link>
            </p>
          ))}
        </div>
        <span className="font-bold text-lg">{song.name}</span>
      </div>
      <FavoriteSongIcons song={song} />
    </div>
  );
});

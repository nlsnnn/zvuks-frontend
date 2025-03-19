import { observer } from "mobx-react-lite";
import { songStore } from "../../store/songStore";

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
        <p className="font-medium text-xs">{song.author}</p>
        <span className="font-bold text-lg">{song.name}</span>
      </div>
      <div className="flex flex-col gap-2 text-xs p-2">
        <i className="fa-solid fa-heart hover:text-red-400 transition cursor-pointer" />
        <i className="fa-solid fa-share hover:text-blue-300 transition cursor-pointer" />
      </div>
    </div>
  );
});
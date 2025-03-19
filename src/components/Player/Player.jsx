import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPlay,
  faStop,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { songStore } from "../../store/songStore";
import { observer } from "mobx-react-lite";
import s from "./Player.module.css";

export const Player = observer(() => {
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toISOString().substring(15, 19);
  };

  return (
    <>
      <div className="flex flex-col w-80 border border-black rounded-lg p-2">
        <img
          src={songStore.currentSong?.cover_path || "/hamster.jpg"}
          className="rounded-t-lg h-36 object-cover"
          alt="Обложка"
        />
        <div className="flex flex-col gap-2 items-center">
          <h4>{songStore.currentSong?.name || "Нет трека"}</h4>

          <div className="px-4 flex items-center justify-center gap-2 ">
            <span>{formatTime(songStore.currentTime)}</span>
            <input
              type="range"
              min={0}
              max={songStore.duration || 0}
              value={songStore.currentTime}
              onChange={(e) => songStore.seek(parseFloat(e.target.value))}
              className="w-full appearance-none bg-gray-300 rounded-full h-1"
            />
            <span>{formatTime(songStore.duration)}</span>
          </div>

          <div className="px-4 flex items-center space-x-2.5 justify-center">
            <span>Громкость</span>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={100}
              onChange={(e) => songStore.setVolume(e.target.value)}
              className={
                s.volume + " w-2 appearance-none bg-gray-300 rounded-full h-1"
              }
            />
          </div>

          <div className="flex space-x-4 text-xl transition">
            <FontAwesomeIcon
              icon={faBackward}
              className="cursor-pointer hover:text-blue-800 transition"
              onClick={() => songStore.playPrevious()}
            />
            <FontAwesomeIcon
              className="cursor-pointer hover:text-blue-800"
              icon={songStore.isPlaying ? faStop : faPlay}
              onClick={() => songStore.togglePlay()}
            />
            <FontAwesomeIcon
              icon={faForward}
              className="cursor-pointer hover:text-blue-800"
              onClick={() => songStore.playNext()}
            />
          </div>
        </div>
      </div>
    </>
  );
});

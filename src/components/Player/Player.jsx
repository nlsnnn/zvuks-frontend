import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPlay,
  faStop,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { songStore } from "../../store/songStore";
import { observer } from "mobx-react-lite";

export const Player = observer(() => {
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
          <span id="ProgressLabel" className="sr-only">
            Loading
          </span>
          <input
            type="range"
            max={100}
            defaultValue={100}
            onChange={(e) => songStore.setVolume(e.target.value)}
            className="cursor-pointer"
          />

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

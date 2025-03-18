import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faPlay,
  faStop,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { Howler } from "howler";
import { songStore } from "../../store/songStore";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

export const Player = observer(({ playing, setPlaying, selectedHowl }) => {
  const [name, setName] = useState("no");
  const [cover, setCover] = useState("/hamster.jpg");

  useEffect(() => {
    if (songStore.song) {
      setName(songStore.song.name);
      setCover(songStore.song.cover_path);
    }
  }, [songStore.song]);

  const handleVolumeChange = (e) => {
    Howler.volume(parseInt(e.target.value, 10) / 100);
  };

  const togglePlay = () => {
    if (!selectedHowl) return;

    if (playing) {
      selectedHowl.pause();
      setPlaying(false);
    } else {
      selectedHowl.play();
      setPlaying(true);
    }
  };

  return (
    <>
      <div className="flex flex-col w-80 border border-black rounded-lg p-2">
        <img
          src={cover}
          className="rounded-t-lg h-36 object-cover"
          alt="Обложка"
        />
        <div className="flex flex-col gap-2 items-center">
          <h4>{name}</h4>
          <span id="ProgressLabel" className="sr-only">
            Loading
          </span>
          <input
            type="range"
            max={100}
            defaultValue={100}
            onChange={handleVolumeChange}
            className="cursor-pointer"
          />

          <div className="flex space-x-4 text-xl transition">
            <FontAwesomeIcon
              icon={faBackward}
              className="cursor-pointer hover:text-blue-800 transition"
            />
            <FontAwesomeIcon
              className="cursor-pointer hover:text-blue-800"
              onClick={togglePlay}
              icon={playing ? faStop : faPlay}
            />
            <FontAwesomeIcon
              icon={faForward}
              className="cursor-pointer hover:text-blue-800 "
            />
          </div>
        </div>
      </div>
    </>
  );
});

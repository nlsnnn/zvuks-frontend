import { useEffect, useState } from "react";
import { Howl } from "howler";
import { songStore } from "../../store/songStore";

export const Song = ({
  song,
  playing,
  setPlaying,
  selectedHowl,
  setSelectedHowl,
  isFirstSong,
}) => {
  const [howl, setHowl] = useState(null);

  useEffect(() => {
    const newHowl = new Howl({
      src: song.path,
      loop: true,
      autoplay: false,
    });

    setHowl(newHowl);

    if (isFirstSong) {
      setSelectedHowl(newHowl);
    }
  }, [song]);

  const togglePlay = () => {
    if (howl.playing()) {
      howl.pause();
      setPlaying(false);
      songStore.song = null;
      return;
    }

    songStore.song = song;
    selectedHowl.playing() && selectedHowl.pause();
    setPlaying(true);
    howl.play();
    setSelectedHowl(howl);
  };

  return (
    <>
      <div
        onClick={togglePlay}
        className={
          selectedHowl === howl && playing
            ? "flex justify-between items-center transition rounded-lg w-60 cursor-pointer bg-blue-300 hover:bg-blue-400"
            : "flex justify-between items-center transition rounded-lg w-60 cursor-pointer bg-gray-200 hover:bg-gray-300"
        }
      >
        <img
          src={song.cover_path}
          className="w-16 h-16 rounded-l-lg"
          alt="obloga"
        />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-xs">{song.author}</p>
          <span className="font-bold text-lg">{song.name}</span>
        </div>
        <div className="flex flex-col gap-2 text-xs p-2">
          <a href="#">
            <i className="fa-solid fa-heart hover:text-red-400 transition"></i>
          </a>
          <a href="#">
            <i className="fa-solid fa-share hover:text-blue-300 transition"></i>
          </a>
        </div>
      </div>
    </>
  );
};

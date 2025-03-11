import { useEffect, useState } from "react";
import { Howl } from "howler";

export const Song = ({ name, author, coverLink, songLink }) => {
  const [howl, setHowl] = useState(null);

  useEffect(() => {
    const newHowl = new Howl({
      src: songLink,
      loop: true,
      autoplay: false,
      volume: 0.25
    });

    setHowl(newHowl);
  }, []);

  const togglePlay = () => {
    if (howl.playing()) {
      howl.pause();
      return;
    }

    howl.play();
  };

  return (
    <>
      <div
        onClick={togglePlay}
        className="flex justify-between items-center bg-gray-200 hover:bg-gray-300 transition rounded-lg w-60 cursor-pointer"
      >
        <img src={coverLink} className="w-16 h-16 rounded-l-lg" alt="obloga" />
        <div className="flex flex-col gap-1">
          <p className="font-medium text-xs">{author}</p>
          <span className="font-bold text-lg">{name}</span>
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

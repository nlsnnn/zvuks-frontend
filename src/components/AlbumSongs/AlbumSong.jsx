import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { songStore } from "../../store/songStore";
import { useState } from "react";

export const AlbumSong = ({ cover, name, artists, index }) => {
  const [isCoverHover, setIsCoverHover] = useState(false);
  const [faIcon, setFaIcon] = useState(faPlay);

  const handleIcon = () => {
    if (songStore.currentSongIndex == index && songStore.isPlaying) {
      setFaIcon(faPlay);
    } else {
      setFaIcon(faPause);
    }
  };

  const handlePlay = () => {
    songStore.playSong(index);
    handleIcon();
  };

  return (
    <>
      <div
        className="flex justify-between rounded cursor-pointer"
        onClick={handlePlay}
        onMouseEnter={() => setIsCoverHover(true)}
        onMouseLeave={() => setIsCoverHover(false)}
      >
        <div className="flex gap-2">
          <div className="relative">
            <img
              src={cover}
              alt={name}
              className="w-16 h-16 rounded object-cover"
            />
            <div
              className={`absolute inset-0 bg-black/50 rounded transition-opacity duration-300 ${
                isCoverHover ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isCoverHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <FontAwesomeIcon
                  icon={faIcon}
                  className="text-white text-2xl transform scale-125"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-2">
            <span>{name}</span>
            <span className="text-gray-500 hover:text-blue-600 cursor-pointer w-max">
              {artists}
            </span>
          </div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <FontAwesomeIcon
            icon={faHeart}
            className="hover:text-red-500 transition cursor-pointer"
          />
          <span className="w-max h-max">1:53</span>
        </div>
      </div>
    </>
  );
};

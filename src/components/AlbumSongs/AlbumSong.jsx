import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const AlbumSong = ({ cover, name, artists }) => {
    return (
      <>
        <div className="flex justify-between rounded">
          <div className="flex gap-2">
            <img src={cover} alt={name} className="w-16 h-16 rounded" />
            <div className="flex flex-col gap-1 pt-2">
              <span>{name}</span>
              <span className="text-gray-500 hover:text-blue-600 cursor-pointer w-max">{artists}</span>
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <FontAwesomeIcon icon={faHeart} className="hover:text-red-500 transition cursor-pointer" />
            <span className="w-max h-max">1:53</span>
          </div>
        </div>
      </>
    );
  };
  
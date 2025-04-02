import { userStore } from "../../store/userStore";
import { FavoriteSongIcon } from "./FavoriteSongIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

export const FavoriteSongIcons = ({song}) => {
  return (
    <>
      {userStore.user && (
        <div className="flex flex-col gap-2 text-xs p-2">
          <FavoriteSongIcon id={song.id} isFavorite={song.is_favorite} />
          <FontAwesomeIcon
            icon={faShare}
            className="hover:text-blue-300 transition cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

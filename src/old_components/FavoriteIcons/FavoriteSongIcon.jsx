import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { favoriteStore } from "../../store/favoriteStore";

export const FavoriteSongIcon = ({ id, isFavorite }) => {
  const handleClick = async () => {
    await favoriteStore.addSong(id);
  };

  return (
    <FontAwesomeIcon
      icon={faHeart}
      onClick={handleClick}
      className={
        "transition cursor-pointer " +
        (isFavorite
          ? "text-red-500 hover:text-gray-200"
          : "hover:text-red-500")
      }
    />
  );
};

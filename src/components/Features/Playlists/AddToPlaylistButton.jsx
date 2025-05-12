import { useEffect } from "react";
import { playlistStore } from "../../../store/playlistStore";
import { userStore } from "../../../store/userStore";

export const AddToPlaylistButton = ({ songId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    playlistStore
      .getUserPlaylists(userStore.user.id)
      .then((data) => setPlaylists(data || []));
  }, []);

  const onAdd = (plId) => {
    playlistStore.addSong(plId, songId);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        +
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border shadow-md rounded">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              onClick={() => onAdd(pl.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {pl.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

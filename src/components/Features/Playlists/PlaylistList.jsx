import { useEffect, useState } from "react";
import { playlistStore } from "../../../store/playlistStore";
import { PlaylistCard } from "../../UI/PlaylistCard";
import { userStore } from "../../../store/userStore";

export const PlaylistList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    playlistStore
      .getUserPlaylists(userStore.user.id)
      .then(data => setList(data || []));
  }, []);

  if (!list.length) return <p className="text-muted">Плейлистов пока нет</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map(pl => <PlaylistCard key={pl.id} playlist={pl}/>)}
    </div>
  );
};

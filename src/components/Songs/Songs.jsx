import { useEffect } from "react";
import { songStore } from "../../store/songStore";
import { Song } from "../Song/Song";
import { observer } from "mobx-react-lite";

export const Songs = observer(() => {
  useEffect(() => {
    songStore.getSongs();
    console.log(songStore.songs);
  }, []);

  return (
    <>
      {songStore.songs && (
        <>
          {songStore.songs.map((song) => (
            <Song
              name={song.name}
              author={song.author}
              coverLink={song.cover_path}
              songLink={song.path}
              key={song.id}
            />
          ))}
        </>
      )}
    </>
  );
});

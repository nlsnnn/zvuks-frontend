import { useEffect } from "react";
import { songStore } from "../../store/songStore";
import { Song } from "../Song/Song";
import { observer } from "mobx-react-lite";

export const Songs = observer(({}) => {
  useEffect(() => {
    songStore.getSongs();
  }, []);

  return (
    <>
      {songStore.songs && (
        <>
          {songStore.songs.map((song, idx) => (
            <Song key={song.id} song={song} index={idx} />
          ))}
        </>
      )}
    </>
  );
});

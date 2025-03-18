import { useEffect } from "react";
import { songStore } from "../../store/songStore";
import { Song } from "../Song/Song";
import { observer } from "mobx-react-lite";

export const Songs = observer(
  ({ playing, setPlaying, selectedHowl, setSelectedHowl }) => {
    useEffect(() => {
      songStore.getSongs();
    }, []);

    return (
      <>
        {songStore.songs && (
          <>
            {songStore.songs.map((song, idx) => (
              <Song
                key={song.id}
                song={song}
                selectedHowl={selectedHowl}
                setSelectedHowl={setSelectedHowl}
                playing={playing}
                setPlaying={setPlaying}
                isFirstSong={idx === 0}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

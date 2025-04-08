import { Helmet } from "react-helmet";
import { Album } from "../Albums/components/Album";
import { useParams } from "react-router-dom";
import { Player } from "../Player/Player";

export const AlbumPage = () => {
  const { albumId } = useParams();

  return (
    <>
      <Helmet>
        <title>Альбом</title>
      </Helmet>
      <Album albumId={albumId} />
      <Player />
    </>
  );
};

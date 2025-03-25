import { Helmet } from "react-helmet";
import { AddAlbum } from "../Add/components/AddAlbum";

export const AddAlbumPage = () => {
  return (
    <>
      <Helmet>
        <title>Добавить альбом</title>
      </Helmet>
      <AddAlbum />
    </>
  );
};

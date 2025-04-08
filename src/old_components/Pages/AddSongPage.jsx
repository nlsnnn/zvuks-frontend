import { Helmet } from "react-helmet";
import { AddSong } from "../Add/components/AddSong";

export const AddSongPage = () => {
  return (
    <>
      <Helmet>
        <title>Добавить песню</title>
      </Helmet>
      <AddSong />
    </>
  );
};

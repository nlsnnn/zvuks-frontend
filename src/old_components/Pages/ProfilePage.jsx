import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Profile } from "../Profile/Profile";

export const ProfilePage = () => {
  const { userId } = useParams();

  return (
    <>
      <Helmet>
        <title>Профиль</title>
      </Helmet>
      <Profile id={userId} />
    </>
  );
};

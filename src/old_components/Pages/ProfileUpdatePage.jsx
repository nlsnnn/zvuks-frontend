import { Helmet } from "react-helmet";
import { ProfileUpdate } from "../Profile/ProfileUpdate";

export const ProfileUpdatePage = () => {
  return (
    <>
      <Helmet>
        <title>Обновление профиля</title>
      </Helmet>
      <ProfileUpdate />
    </>
  );
};

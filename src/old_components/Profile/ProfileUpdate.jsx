import { useState } from "react";
import { Header } from "../Header/Header";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export const ProfileUpdate = () => {
  const [avatar, setAvatar] = useState(userStore.userProfile.avatar);
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  const handleAvatarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setAvatarFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await userStore.updateProfile(avatarFile);
    if (res) {
        navigate("/profile")
    }

  };

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        <h2 className="text-2xl font-semibold">Обновление профиля</h2>
        <div className="flex gap-24">
          <input
            type="file"
            id="avatarImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarImageChange}
          />
          <img
            src={avatar}
            alt="Загрузите аватарку"
            className="rounded-lg border border-black w-80 h-72 object-cover hover:opacity-90 cursor-pointer"
            onClick={() => document.getElementById("avatarImageInput").click()}
          />
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Имя пользователя</label>
              <input
                type="text"
                value={userStore.userProfile.username}
                className="border rounded p-1"
                disabled
              />
            </div>
            <button
              type="submit"
              className="p-2 rounded-lg bg-black text-white font-medium hover:opacity-80 transition text-center cursor-pointer"
            >
              Обновить
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

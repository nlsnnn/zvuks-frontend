import { useState } from "react";
import { Header } from "../../Header/Header";
import { songStore } from "../../../store/songStore";
import { useNavigate } from "react-router-dom";
import { Artists } from "./Artists";

export const AddSong = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const navigate = useNavigate();

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
      setCoverImageFile(file);
    }
  };

  const handleSongFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSongFile(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const artistIds = selectedAuthors.map((author) => author.id).join(",");

    const res = await songStore.addSong(
      name,
      date,
      artistIds,
      coverImageFile,
      songFile
    );
    if (res) {
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <main className="main-container mt-8">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Добавить песню
        </h2>

        <div className="flex gap-12 md:gap-48 items-center md:items-start flex-col md:flex-row mt-12">
          <div className="flex flex-col max-sm:flex-col max-md:items-center max-md:flex-row  gap-8">
            <input
              type="file"
              id="coverImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleCoverImageChange}
            />
            <img
              src={coverImage || "./../img/obloga.png"}
              alt="Загрузите обложку"
              className="rounded-lg border border-black w-80 h-72 object-cover hover:opacity-90 cursor-pointer"
              onClick={() => document.getElementById("coverImageInput").click()}
            />

            <input
              type="file"
              id="songFileInput"
              accept="audio/*"
              style={{ display: "none" }}
              onChange={handleSongFileChange}
            />
            <img
              src="./../img/sound.png"
              alt="Загрузите песню"
              className="rounded-lg border border-black w-80 h-32 object-cover hover:opacity-80 cursor-pointer"
              onClick={() => document.getElementById("songFileInput").click()}
            />
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Название песни</label>
              <input
                type="text"
                className="p-1 border border-black rounded-lg outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium">Дата выпуска</label>
              <input
                type="datetime-local"
                className="p-1 border border-black rounded-lg outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Artists
              selectedAuthors={selectedAuthors}
              setSelectedAuthors={setSelectedAuthors}
            />

            <button
              type="submit"
              className="p-2 rounded-lg bg-black text-white font-medium hover:opacity-80 transition text-center"
            >
              Добавить
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

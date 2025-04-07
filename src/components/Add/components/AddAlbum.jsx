import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { albumStore } from "../../../store/albumStore";
import { Header } from "../../Header/Header";
import { Artists } from "./Artists";

export const AddAlbum = () => {
  const [albumName, setAlbumName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [songs, setSongs] = useState([
    { name: "", feats: "", file: null, trackNumber: 1 },
  ]);
  const navigate = useNavigate();

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
      setCoverImageFile(file);
    }
  };

  const handleSongFileChange = (i, e) => {
    const file = e.target.files[0];
    const newSongs = [...songs];
    newSongs[i].file = file;
    setSongs(newSongs);
  };

  const handleAddSong = () => {
    if (songs.length < 50) {
      setSongs([
        ...songs,
        { name: "", feats: "", file: null, trackNumber: songs.length + 1 },
      ]);
    }
  };

  const handleRemoveSong = (index) => {
    const newSongs = songs.filter((_, i) => i !== index);
    setSongs(newSongs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const artistIds = selectedAuthors.map((author) => author.id).join(",");

    const res = await albumStore.addAlbum(
      albumName,
      releaseDate,
      coverImageFile,
      songs
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
          Добавить альбом
        </h2>

        <div className="flex gap-12 md:gap-48 items-center md:items-start flex-col md:flex-row mt-12">
          <div className="flex flex-col gap-8">
            <input
              type="file"
              id="coverImageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleCoverImageChange}
            />
            <img
              src={coverImage || ""}
              alt="Загрузите обложку"
              className="rounded-lg border border-black w-80 h-72 object-cover hover:opacity-90 cursor-pointer"
              onClick={() => document.getElementById("coverImageInput").click()}
            />

            {songs.map((song, index) => (
              <div key={index} className="flex flex-col">
                <input
                  type="file"
                  id={`songFileInput-${index}`}
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleSongFileChange(index, e)}
                />
                <img
                  src="/"
                  alt="Загрузите песню"
                  className="rounded-t-lg border border-black w-80 h-32 object-cover hover:opacity-80 cursor-pointer"
                  onClick={() =>
                    document.getElementById(`songFileInput-${index}`).click()
                  }
                />
                <button
                  type="button"
                  className="p-2 rounded-b-lg text-red-500 text-sm font-semibold bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => handleRemoveSong(index)}
                >
                  Удалить трек
                </button>
              </div>
            ))}

            <button
              type="button"
              className="p-2 rounded-lg bg-black text-white font-medium hover:opacity-80 transition text-center"
              onClick={handleAddSong}
              disabled={songs.length >= 50}
            >
              Добавить трек
            </button>
          </div>

          <div className="flex flex-col gap-16">
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Название альбома</label>
                <input
                  type="text"
                  className="p-1 border border-black rounded-lg outline-none"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Дата выпуска</label>
                <input
                  type="datetime-local"
                  className="p-1 border border-black rounded-lg outline-none"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </div>
            </form>

            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Добавленные песни</h3>

              {songs.map((song, index) => (
                <div
                  key={index}
                  className="p-2 flex flex-col gap-3 border border-black rounded"
                >
                  <input
                    type="text"
                    className="p-0.5 border border-blue-400 rounded outline-none"
                    placeholder="Название трека"
                    value={song.name}
                    onChange={(e) =>
                      setSongs(
                        songs.map((s, i) =>
                          i === index ? { ...s, name: e.target.value } : s
                        )
                      )
                    }
                  />
                  <Artists
                    selectedAuthors={selectedAuthors}
                    setSelectedAuthors={setSelectedAuthors}
                  />
                  {/* <input
                    type="text"
                    className="p-0.5 border border-blue-400 rounded outline-none"
                    placeholder="Гости"
                    value={song.feats}
                    onChange={(e) =>
                      setSongs(
                        songs.map((s, i) =>
                          i === index ? { ...s, feats: e.target.value } : s
                        )
                      )
                    }
                  /> */}
                  <input
                    type="number"
                    className="p-0.5 border border-blue-400 rounded outline-none"
                    placeholder="Номер трека"
                    value={song.trackNumber}
                    min={1}
                    max={50}
                    onChange={(e) =>
                      setSongs(
                        songs.map((s, i) =>
                          i === index
                            ? { ...s, trackNumber: e.target.value }
                            : s
                        )
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="p-2 rounded-lg bg-black text-white font-medium hover:opacity-80 transition text-center mt-6"
          onClick={handleSubmit}
        >
          Добавить альбом
        </button>
      </main>
    </>
  );
};

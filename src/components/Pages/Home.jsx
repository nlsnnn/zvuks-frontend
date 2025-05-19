import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { musicStore } from "../../store/musicStore";
import { songStore } from "../../store/songStore";
import { SongCard } from "../UI/SongCard";
import { AlbumCard } from "../UI/AlbumCard";
import { useDebounce } from "use-debounce";
import { Input } from "../UI/Input";
import { FaFire, FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineFiberNew } from "react-icons/md";
import { userStore } from "../../store/userStore";
import { Link } from "react-router-dom";

export const Home = observer(() => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    songStore.getPopulars();
    songStore.getNews();
    songStore.getMostLiked();
  }, []);

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      musicStore.searchAll(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="p-6 space-y-10">
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-10 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">Слушай свою музыку</h1>
        <p className="text-lg opacity-90 mb-6">
          Погрузись в мир любимых треков и новых открытий
        </p>
        <Input
          type="text"
          placeholder="Поиск треков или альбомов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white text-dark"
        />
      </div>

      {debouncedSearch && (
        <>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FaMagnifyingGlass className="text-gray-500 text-2xl" />
              <h2 className="text-2xl font-semibold">Найденные песни</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {musicStore.searchResultsSongs.map((song) => {
                console.log(musicStore.searchResultsSongs);

                return <SongCard key={song.id} song={song} />;
              })}
              {musicStore.searchResultsSongs.length === 0 && (
                <p className="text-dark col-span-full">Песен не найдено</p>
              )}
            </div>
          </section>

          {/* <section>
            <h2 className="text-2xl font-semibold mb-4">
              💿 Найденные альбомы
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {musicStore.searchResultsAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
              {musicStore.searchResultsAlbums.length === 0 && (
                <p className="text-white col-span-full">Альбомов не найдено</p>
              )}
            </div>
          </section> */}
        </>
      )}

      {!debouncedSearch && (
        <>
          <section>
            <div className="flex items-center gap-2  mb-4">
              <FaFire className="text-red-500 text-2xl" />
              <h2 className="text-2xl font-semibold"> Популярное</h2>
            </div>
            {songStore.popularSongs && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {songStore.popularSongs.map((song) => (
                  <SongCard key={song.id} song={song} type="popular" />
                ))}
              </div>
            )}
            {(!songStore.popularSongs || songStore.popularSongs?.length === 0) && (
              <h2 className="text-dark">
                Ничего нет. Самое время{" "}
                <Link
                  to={userStore.user ? "/artist/manage" : "/login"}
                  className="text-primary hover:text-blue-700 transition"
                >
                  добавить
                </Link>{" "}
                свою песню!
              </h2>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <MdOutlineFiberNew className="text-red-500 text-3xl" />
              <h2 className="text-2xl font-semibold">Новинки</h2>
            </div>
            {songStore.newSongs && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {songStore.newSongs.map((song) => (
                  <SongCard key={song.id} song={song} type="new" />
                ))}
              </div>
            )}

            {(!songStore.newSongs || songStore.newSongs?.length === 0) && (
              <h2 className="text-dark">
                Ничего нет. Самое время{" "}
                <Link
                  to={userStore.user ? "/artist/manage" : "/login"}
                  className="text-primary hover:text-blue-700 transition"
                >
                  добавить
                </Link>{" "}
                свою песню!
              </h2>
            )}
          </section>

          <section>
            <div className="flex items-center gap-2 mb-4">
              <FaHeart className="text-red-500 text-2xl" />
              <h2 className="text-2xl font-semibold"> Часто лайкают</h2>
            </div>
            {songStore.mostLikedSongs && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {songStore.mostLikedSongs.map((song) => (
                  <SongCard key={song.id} song={song} type="liked" />
                ))}
              </div>
            )}

            {(!songStore.mostLikedSongs || songStore.mostLikedSongs?.length === 0) && (
              <h2 className="text-dark">
                Ничего нет. Самое время{" "}
                <Link
                  to={userStore.user ? "/artist/manage" : "/login"}
                  className="text-primary hover:text-blue-700 transition"
                >
                  добавить
                </Link>{" "}
                свою песню!
              </h2>
            )}
          </section>
        </>
      )}
    </div>
  );
});

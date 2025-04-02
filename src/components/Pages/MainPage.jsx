import { Header } from "../Header/Header";
import { Player } from "../Player/Player";
import { Songs } from "../Songs/Songs";
import { Link } from "react-router-dom";
import { AlbumCards } from "../Albums/components/AlbumCards";

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Главная страница</h1>
        <Player />
        <div className="flex gap-2">
          <Link to='/add-song' className="text-red-500 hover:text-red-800 transition">Добавить песню</Link>
          <Link to='/add-album' className="text-blue-500 hover:text-blue-800 transition">Добавить альбом </Link>
        </div>
        <div className="flex gap-2">
          <Link to='/favorite/songs' className="text-green-800 hover:text-green-500 transition">Моя музыка</Link>
        </div>
        <AlbumCards />
        <Songs />
      </main>
    </>
  );
};

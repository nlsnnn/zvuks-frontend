import { Header } from "../Header/Header";
import { Player } from "../Player/Player";
import { Songs } from "../Songs/Songs";
import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Главная страница</h1>
        <Player />
        <Link to='/add-song' className="text-red-500 hover:text-red-800 transition">Добавить песню</Link>
        <Link to='/add-album' className="text-blue-500 hover:text-blue-800 transition">Добавить альбом </Link>
        <Songs />
      </main>
    </>
  );
};

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
        <Link to='/add-song' className="text-red-500">Добавить песню</Link>
        <Songs />
      </main>
    </>
  );
};

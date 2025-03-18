import { useState } from "react";
import { Header } from "../Header/Header";
import { Player } from "../Player/Player";
import { Songs } from "../Songs/Songs";
import { Link } from "react-router-dom";

export const MainPage = () => {
  const [selectedHowl, setSelectedHowl] = useState(null);
  const [playing, setPlaying] = useState(null)

  return (
    <>
      <Header />
      <main className="container">
        <h1>Главная страница</h1>
        <Player
          playing={playing}
          setPlaying={setPlaying}
          selectedHowl={selectedHowl}
        />
        <Link to='/add-song' className="text-red-500">Добавить песню</Link>
        <Songs
          playing={playing}
          setPlaying={setPlaying}
          selectedHowl={selectedHowl}
          setSelectedHowl={setSelectedHowl}
        />
      </main>
    </>
  );
};

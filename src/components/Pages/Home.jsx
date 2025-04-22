import { SongList } from "../Features/Songs/SongList";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-4">Популярные треки</h1>
        <SongList />
      </div>
      <div className="flex gap-2">
        <button className="btn-outline w-max h-12 font-semibold">
          <Link to="/albums/add">Добавить альбом</Link>
        </button>
        <button className="btn-outline w-max h-12 font-semibold">
          <Link to="/songs/add">Добавить песню</Link>
        </button>
      </div>
    </div>
  );
};

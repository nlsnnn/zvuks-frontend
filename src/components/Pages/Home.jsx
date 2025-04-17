import { SongList } from "../Features/Songs/SongList";

export const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Популярные треки
      </h1>
      <SongList />
    </div>
  );
};

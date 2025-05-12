import { observer } from "mobx-react-lite";
import { FavoriteSongList } from "../Features/Favorite/FavoriteSongList";
import { FavoriteAlbumList } from "../Features/Favorite/FavoriteAlbumList";

export const Favorite = observer(() => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-dark">Любимые альбомы</h2>
        <FavoriteAlbumList />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-dark">Любимые песни</h2>
        <FavoriteSongList />
      </section>
    </div>
  );
});

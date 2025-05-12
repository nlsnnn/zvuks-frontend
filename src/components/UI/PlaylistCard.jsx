import { Link } from "react-router-dom";

export const PlaylistCard = ({ playlist }) => {
  <Link
    to={`/playlists/${playlist.id}`}
    className="glass-card p-4 flex flex-col items-center gap-2 rounded-xl hover:shadow-2xl"
  >
    <img
      src={playlist.cover}
      alt={playlist.name}
      className="w-32 h-32 object-cover rounded-md shadow-md"
    />
    <div className="text-lg font-semibold text-dark truncate">
      {playlist.name}
    </div>
    <div className="text-sm text-muted">
      {playlist.private ? "Приватный" : "Публичный"}
    </div>
  </Link>;
};

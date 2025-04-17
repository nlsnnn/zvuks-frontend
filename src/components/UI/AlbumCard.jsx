import { Link } from "react-router-dom";

export const AlbumCard = ({ album }) => {
  return (
    <Link
      to={`/album/${album.id}`}
      className="glass-card p-4 flex flex-col items-center gap-4 rounded-xl transition hover:shadow-2xl"
    >
      <img
        src={album.cover}
        alt={album.title}
        className="w-32 h-32 rounded-lg object-cover shadow-md"
      />
      <div className="text-center text-[var(--color-dark)]">
        <div className="text-lg font-semibold">{album.title}</div>
        <div className="text-sm text-[var(--color-muted)]">{album.artist}</div>
      </div>
    </Link>
  );
};

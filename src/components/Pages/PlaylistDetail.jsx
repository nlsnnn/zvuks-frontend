import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { playlistStore } from "../../store/playlistStore";
import { SongCard } from "../UI/SongCard";

export const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const [pl, setPl] = useState(null);
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await playlistStore.getPlaylist(playlistId); // :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}
      setPl(data);
      setSongs(data.songs || []);
    })();
  }, [playlistId]);

  if (!pl) return <div className="text-center">Загрузка...</div>;

  const removeSong = async (songId) => {
    await playlistStore.removeSong(playlistId, songId);
    setSongs(songs.filter(s => s.id !== songId));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <img src={pl.cover} alt={pl.name}
             className="w-32 h-32 object-cover rounded-lg"/>
        <div>
          <h1 className="text-2xl font-bold">{pl.name}</h1>
          <p className="text-sm text-muted">
            {pl.is_private ? "Приватный плейлист" : "Публичный плейлист"}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Link to={`/playlists/${playlistId}/edit`}
                className="btn-outline">Редактировать</Link>
          <button onClick={() => {
            playlistStore.deletePlaylist(playlistId);
            navigate("/playlists");
          }} className="btn-outline text-red-500">Удалить</button>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Треки</h2>
        {songs.length
          ? songs.map((s, i) => (
              <div key={s.id} className="relative">
                <SongCard song={s} isPlaying={false}/>
                <button onClick={()=>removeSong(s.id)}
                        className="absolute top-2 right-2 text-red-500">✕</button>
              </div>
            ))
          : <p className="text-muted">Плейлист пуст</p>
        }
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Добавить трек</h2>
        {/* Здесь можно переиспользовать SongList, оборачивая SongCard в AddToPlaylistButton */}
      </section>
    </div>
  );
};

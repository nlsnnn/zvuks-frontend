import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArtistService } from "../../service/artistService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const periods = [7, 30, 90];

export const ArtistSongStats = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    ArtistService.getSongInfo(id, days)
      .then((res) => setData(res.data))
      .catch((e) => setError("Не удалось загрузить статистику"));
  }, [id, days]);

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  if (!data) {
    return <div className="p-6 text-muted">Загрузка...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-dark">Статистика трека: {data.title}</h1>
      <p className="text-muted">Общее количество прослушиваний: {data.listens}</p>

      <div className="flex gap-4 mb-4">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setDays(period)}
            className={`px-3 py-1 rounded-md border text-sm transition ${
              days === period
                ? "bg-[var(--color-primary)] text-white"
                : "border-gray-300 text-[var(--color-dark)] hover:bg-gray-100"
            }`}
          >
            За {period} дней
          </button>
        ))}
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <LineChart
            data={data.dailyStats}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="listens"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

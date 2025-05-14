import {
  FaHeadphones,
  FaUserFriends,
  FaMusic,
  FaCompactDisc,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import CountUp from "react-countup";

export const ArtistDashboardBanner = ({ dashboard }) => {
  const cards = [
    {
      title: "Прослушивания",
      icon: <FaHeadphones className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.listens,
    },
    {
      title: "Подписчики",
      icon: <FaUserFriends className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.subscribers,
    },
    {
      title: "Треков",
      icon: <FaMusic className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.songs,
    },
    {
      title: "Альбомов",
      icon: <FaCompactDisc className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.albums,
    },
    {
      title: "Песен в избранном",
      icon: <FaHeart className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.favorite_songs,
    },
    {
      title: "Альбомов в избранном",
      icon: <FaStar className="text-2xl text-[var(--color-primary)]" />,
      value: dashboard?.favorite_albums,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div key={i} className="glass-card p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {card.icon}
            <h2 className="text-lg font-semibold">{card.title}</h2>
          </div>
          <p className="text-3xl font-bold text-[var(--color-primary)]">
            <CountUp end={card.value || 0} duration={1.2} separator=" " />
          </p>
        </div>
      ))}
    </div>
  );
};

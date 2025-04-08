import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="w-56 p-6 bg-white/50 backdrop-blur-md border-r border-gray-200 hidden md:block">
      <nav className="flex flex-col gap-4 text-base font-medium text-gray-800">
        <Link to="/">Главная</Link>
        <Link to="/profile">Профиль</Link>
        <Link to="/upload">Загрузить</Link>
      </nav>
    </aside>
  );
};

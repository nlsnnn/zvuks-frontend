import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { SearchBar } from "../Features/SearchBar";
import { Link } from "react-router-dom";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 z-50 shadow-sm">
      <button className="md:hidden mr-4" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu className="text-2xl text-gray-700" />
      </button>
      <div className="hidden md:block text-xl font-bold mr-4 md:mr-8 text-blue-600">Звукс</div>
      <SearchBar />
      <div className="flex items-center gap-4 ml-auto">{/* icons */}</div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md border-t border-gray-200 flex flex-col px-4 py-2 md:hidden">
          <Link to="/" className="py-2 text-gray-800">
            Главная
          </Link>
          <Link to="/profile" className="py-2 text-gray-800">
            Профиль
          </Link>
          <Link to="/upload" className="py-2 text-gray-800">
            Загрузить
          </Link>
        </div>
      )}
    </header>
  );
};

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { SearchBar } from "../Features/SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { observer } from "mobx-react-lite";
import { sidebarRoutes } from "../../config/routes";

export const Header = observer(() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass-card flex items-center px-4 md:px-6 z-50">
      <button className="md:hidden mr-4" onClick={() => setMenuOpen(!menuOpen)}>
        <FiMenu className="text-2xl text-[var(--color-primary)]" />
      </button>
      <div className="hidden md:block text-xl font-bold mr-4 md:mr-8 text-[var(--color-primary)] select-none">
        🎵 zvuks
      </div>
      <SearchBar />
      <div className="flex items-center gap-4 ml-auto">
        {userStore.user && (
          <>
            <span className="font-medium text-[var(--color-dark)]">
              {userStore.user.username}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 transition"
            >
              Выйти
            </button>
          </>
        )}
        {!userStore.user && (
          <Link
            to="/login"
            className="text-[var(--color-primary)] hover:underline"
          >
            Войти
          </Link>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full glass-card flex flex-col px-4 py-2 md:hidden">
          {sidebarRoutes.map((route, i) => (
            <Link
              to={route.href}
              key={i}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-[var(--color-dark)] hover:text-[var(--color-primary)]"
            >
              {route.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
});

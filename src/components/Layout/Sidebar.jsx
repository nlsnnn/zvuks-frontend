import { Link, useLocation } from "react-router-dom";
import { sidebarRoutes } from "../../config/routes";
import { FaHeart } from "react-icons/fa6";

export const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-56 p-6 glass-card hidden md:flex flex-col gap-4 justify-between">
      <nav className="flex flex-col gap-2 text-[var(--color-dark)]">
        {sidebarRoutes.map((route, i) => {
          const isActive = pathname.split("/")[1] === route.href.split("/")[1];
          return (
            <Link
              key={i}
              to={route.href}
              className={
                "flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium " +
                (isActive
                  ? " bg-[var(--color-primary)] text-white shadow-sm"
                  : " hover:bg-[var(--color-primary)]/10 text-[var(--color-dark)]")
              }
            >
              <route.icon
                className={`text-lg ${
                  isActive
                    ? "text-white"
                    : "text-[var(--color-primary)] group-hover:text-white"
                }`}
              />
              <span>{route.title}</span>
            </Link>
          );
        })}
      </nav>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-muted">
          Email поддержки:{" "}
          <a
            href="mailto:support@zvuks.com"
            className="text-muted hover:underline hover:text-blue-600"
          >
            support@zvuks.com
          </a>
        </p>
        <p className="text-xs text-muted">© 2025 Zvuks. Все права защищены.</p>
      </div>
    </aside>
  );
};

import { Link } from "react-router-dom";
import { sidebarRoutes } from "../../config/routes";
import { useState } from "react";

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("/");

  return (
    <aside className="w-56 p-6 bg-white/50 backdrop-blur-md border-r border-gray-200 hidden md:flex flex-col justify-between">
      <nav className="flex flex-col gap-4 text-base font-medium text-gray-800">
        {sidebarRoutes.map((route, i) => (
          <Link
            to={route.href}
            onClick={() => setActiveTab(route.href)}
            key={i}
            className={
              "flex items-center gap-3 p-2 rounded-md transition-colors duration-200 " +
              (activeTab === route.href
                ? " text-blue-600 bg-blue-100"
                : " hover:text-blue-500 hover:bg-blue-50")
            }
          >
            <route.icon className="w-5 h-5" />
            {route.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

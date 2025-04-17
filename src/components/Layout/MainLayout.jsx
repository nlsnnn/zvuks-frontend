import { Header } from "./Header";
import { Player } from "./Player";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[var(--color-light)] text-[var(--color-dark)]">
        <Header />
        <div className="flex flex-1 pt-16 pb-20 gap-4 px-2 md:px-4">
          <Sidebar />
          <main className="flex-1">
            <div className="glass-card w-full h-full p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
        <Player />
      </div>
    </>
  );
};

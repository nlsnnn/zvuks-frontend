import { Header } from "./Header";
import { Player } from "./Player";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#f9f9f9]">
        <Header />
        <div className="flex flex-1 pt-16 pb-20">
          <Sidebar />
          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
        <Player />
      </div>
    </>
  );
};

import { Header } from "../../Header/Header";
import { Friends } from "../../Friends/Friends";

export const FriendsPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <div class="flex flex-col  items-center md:items-start">
          <h2 class="text-3xl font-semibold text-center md:text-left">
            Друзья
          </h2>
          <div class="flex gap-4 mt-6 flex-col items-center sm:flex-row">
            <input
              type="text"
              class="py-1.5 px-4 rounded-lg border border-black text-xs outline-none"
              placeholder="Имя..."
            />
            <button class="py-1 px-8 max-sm:w-1/2 rounded-lg bg-blue-600  text-white font-medium hover:bg-blue-500 transition">
              Найти
            </button>
          </div>
        </div>
        <Friends />
      </main>
    </>
  );
};

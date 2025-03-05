import { useParams } from "react-router-dom";
import { Header } from "../../Header/Header";
import { Chat } from "../../Chats/Chat";
import { Contacts } from "../../Contacts/Contacts";

export const ChatsPage = () => {
  const { userId } = useParams(); 

  return (
    <>
      <Header />
      <main className="container mx-auto mt-8">
        <div className="flex flex-col items-center lg:items-start">
          <h2 className="text-3xl font-semibold">Чаты</h2>
          <div className="flex gap-4 flex-col md:flex-row mt-6">
            <input
              type="text"
              className="py-1.5 px-4 rounded-lg border border-black text-xs outline-none"
              placeholder="Имя..."
            />
            <button className="py-1 px-8 rounded-lg bg-blue-600  text-white font-medium hover:bg-blue-500 transition">
              Найти
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-0  lg:flex-row mt-4">
          <Contacts />
          {userId && <Chat userId={userId} />}
          {!userId && <h1>Выберите чат</h1>}
        </div>
      </main>
    </>
  );
};

import { Header } from "../Header/Header";
import { Songs } from "../Songs/Songs";

export const MainPage = () => {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Главная страница</h1>
        <Songs />
      </main>
    </>
  );
};

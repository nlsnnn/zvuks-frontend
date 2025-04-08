import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <>
      <h2>Страница не найдена</h2>
      <Link to={"/"}>Главная</Link>
    </>
  );
};

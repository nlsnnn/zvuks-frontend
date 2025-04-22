import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <h1 className="text-2xl font-bold ">Такой страницы не существует!</h1>
      <Link to="/" className="hover:text-[var(--color-primary)]">
        Вернуться на главную
      </Link>
    </div>
  );
};

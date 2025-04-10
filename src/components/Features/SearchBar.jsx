import { Input } from "../UI/Input";

export const SearchBar = () => {
  return (
    <div className="flex-1 sm:flex justify-center hidden">
      <Input placeholder="Найти трек или артиста" />
    </div>
  );
};

import { useState } from "react";
import { FriendCard } from "../../UI/FriendCard";

export const SearchUsers = ({ searchResults }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSendRequest = (id) => {
      console.log(`Отправить запрос пользователю с id ${id}`);
    };

    return (
      <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Поиск пользователей</h2>
        <div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Результаты поиска
        </h2>
        <SearchUsers searchResults={searchResults} />
      </div>
        {/* <form onSubmit={handleSearch} className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Введите имя пользователя"
            className="p-2 border border-gray-300 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Поиск
          </button>
        </form> */}
        <div className="space-y-2">
          {searchResults && searchResults.map((user) => (
            <FriendCard
              key={user.id}
              friend={user}
              onSendRequest={handleSendRequest}
            />
          ))}
        </div>
      </div>
    );
  };
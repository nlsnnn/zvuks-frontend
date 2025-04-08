import { useState } from "react";
import { userStore } from "../../../store/userStore";

export const Artists = ({ selectedAuthors, setSelectedAuthors }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorList, setAuthorList] = useState([]);

  const handleSearchInput = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const users = await userStore.getUsers(query);
      setAuthorList(users || []);
    } else {
      setAuthorList([]);
    }
  };

  const handleAddAuthor = (author) => {
    if (!selectedAuthors.find((a) => a.id === author.id)) {
      setSelectedAuthors([...selectedAuthors, author]);
    }
    setSearchQuery("");
    setAuthorList([]);
  };

  const handleRemoveAuthor = (authorId) => {
    setSelectedAuthors(selectedAuthors.filter((a) => a.id !== authorId));
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">Артисты</label>
      <input
        type="text"
        className="p-1 border border-black rounded-lg outline-none"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Поиск авторов..."
      />
      {authorList.length > 0 && (
        <div className="flex flex-col gap-2 mt-2">
          {authorList.map((author) => (
            <div
              key={author.id}
              className="flex justify-between items-center p-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              onClick={() => handleAddAuthor(author)}
            >
              <span>{author.username}</span>
            </div>
          ))}
        </div>
      )}
      {selectedAuthors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedAuthors.map((author) => (
            <div
              key={author.id}
              className="flex items-center gap-2 bg-gray-200 p-2 rounded"
            >
              <span>{author.username}</span>
              <button
                type="button"
                onClick={() => handleRemoveAuthor(author.id)}
                className="text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

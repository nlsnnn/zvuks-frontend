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
      <label className="form-label">Артисты</label>

      <input
        type="text"
        className="form-input"
        value={searchQuery}
        onChange={handleSearchInput}
        placeholder="Поиск авторов..."
      />

      {authorList.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-md shadow mt-2 divide-y divide-gray-100 max-h-48 overflow-auto">
          {authorList.map((author) => (
            <div
              key={author.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleAddAuthor(author)}
            >
              {author.username}
            </div>
          ))}
        </div>
      )}

      {selectedAuthors.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedAuthors.map((author) => (
            <div
              key={author.id}
              className="flex items-center gap-2 bg-[var(--color-glass)] border border-[var(--color-glass-border)] text-[var(--color-dark)] px-3 py-1 rounded-lg shadow-sm backdrop-blur-sm"
            >
              <span>{author.username}</span>
              <button
                type="button"
                onClick={() => handleRemoveAuthor(author.id)}
                className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { friendStore } from "../../store/friendStore";
import { FriendsList } from "../Features/Friends/FriendsList";
import { SentRequestsList } from "../Features/Friends/SentRequestsList";
import { ReceivedRequestsList } from "../Features/Friends/ReceivedRequestsList";
import { SearchResultsList } from "../Features/Friends/SearchResultsList";

export const Friends = observer(() => {
  const [activeTab, setActiveTab] = useState("friends");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      friendStore.searchUsers(query);
      setActiveTab("search");
    } else {
      friendStore.searchResults = [];
    }
  };

  return (
    <div className="p-4 mx-auto ">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">Друзья</h1>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {["friends", "sent", "received"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-200 text-[var(--color-dark)] hover:bg-gray-300"
              }`}
            >
              {tab === "friends" && "Мои друзья"}
              {tab === "sent" && "Отправленные"}
              {tab === "received" && "Полученные"}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Поиск пользователей"
          className="p-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </div>
      {activeTab === "friends" && <FriendsList />}
      {activeTab === "sent" && <SentRequestsList />}
      {activeTab === "received" && <ReceivedRequestsList />}
      {activeTab === "search" && (
        <SearchResultsList searchQuery={searchQuery} />
      )}
    </div>
  );
});

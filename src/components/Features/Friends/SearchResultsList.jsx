import { observer } from "mobx-react-lite";
import { friendStore } from "../../../store/friendStore";
import { FriendCard } from "../../UI/FriendCard";

export const SearchResultsList = observer(({ searchQuery }) => {
  if (!searchQuery) return null;
  if (friendStore.loading) return <div className="text-center">Поиск...</div>;
  if (friendStore.error)
    return <div className="text-red-500 text-center">{friendStore.error}</div>;
  if (!friendStore.searchResults.length)
    return <div className="text-center text-gray-500">Ничего не найдено</div>;

  return (
    <div className="space-y-2">
      {friendStore.searchResults.map((user) => {
        const actions = [];
        if (user.status === "friends") {
          actions.push({
            label: "Написать",
            color: "blue",
            onClick: () => console.log(`Сообщение ${user.id}`),
          });
        } else if (user.status === "pending") {
          actions.push({
            label: "Запрос отправлен",
            color: "gray",
            disabled: true,
          });
        } else {
          actions.push({
            label: "Добавить",
            color: "blue",
            onClick: () => friendStore.sendRequest(user.id),
          });
        }
        return <FriendCard key={user.id} friend={user} actions={actions} />;
      })}
    </div>
  );
});

import { observer } from "mobx-react-lite";
import { friendStore } from "../../../store/friendStore";
import { FriendCard } from "../../UI/FriendCard";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../../store/userStore";

export const SearchResultsList = observer(({ searchQuery }) => {
  const navigate = useNavigate();

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
        if (user.id == userStore.user.id) {
          actions.push({
            label: "Профиль",
            color: "blue",
            onClick: () => navigate("/profile"),
          });
        } else if (user.status === "friends") {
          actions.push({
            label: "Написать",
            color: "blue",
            onClick: () => navigate("/chats/" + user.id),
          });
        } else if (user.status === "pending") {
          actions.push({
            label: "Принять запрос",
            color: "blue",
            onClick: () => friendStore.acceptRequest(user.id),
          });
          actions.push({
            label: "Отклонить запрос",
            color: "red",
            onClick: () => friendStore.rejectRequest(user.id),
          });
        } else if (user.status === "sended") {
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

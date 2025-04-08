import { FaUser, FaUserGroup, FaComment, FaMusic } from "react-icons/fa6";

export const sidebarRoutes = [
  {
    href: "/",
    icon: FaMusic,
    title: "Главная",
  },
  {
    href: "/profile",
    icon: FaUser,
    title: "Профиль",
  },
  {
    href: "/friends",
    icon: FaUserGroup,
    title: "Друзья",
  },
  {
    href: "/chats",
    icon: FaComment,
    title: "Чаты",
  },
];

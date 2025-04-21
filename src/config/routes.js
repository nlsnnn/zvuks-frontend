import {
  FaUser,
  FaUserGroup,
  FaComment,
  FaMusic,
  FaHeart,
} from "react-icons/fa6";

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
    href: "/favorites",
    icon: FaHeart,
    title: "Моя музыка",
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

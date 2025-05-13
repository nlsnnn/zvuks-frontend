import {
  FaUser,
  FaUserGroup,
  FaComment,
  FaMusic,
  FaHeart,
  FaGear
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
    title: "Любимое",
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
  {
    href: "/artist",
    icon: FaGear,
    title: "Артист",
  },
];

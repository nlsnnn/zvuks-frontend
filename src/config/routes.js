import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faUserGroup, faMusic } from "@fortawesome/free-solid-svg-icons";
import s from "../components/Header/Header.module.css";

export const headerRoutes = [
  {
    href: "/",
    icon: faMusic,
  },
  {
    href: "friends/",
    icon: faUserGroup,
  },
  {
    href: "chats/",
    icon: faComment,
  },
];

export const routes = {
  user: [
    {
      title: "Профиль",
      href: "profile",
      class: s.blockClass,
    },
    {
      title: "Музыка",
      href: "music",
      class: s.blockClass,
    },
    {
      title: "Друзья",
      href: "friends",
      class: s.blockClass,
    },
    {
      title: "Чаты",
      href: "chats",
      class: s.blockClass,
    },
    {
      title: "Выйти",
      href: "logout",
      class: s.blockClass + " " + s.last,
    },
  ],
  
  
  // [
  //   {
  //     title: 'Войти',
  //     href: 'login',
  //     class: s.btn
  //   }
  // ],
  admin: [
    {
      title: "Профиль",
      href: "profile",
      class: s.blockClass,
    },
    {
      title: "Админ-панель",
      href: "admin",
      class: s.blockClass,
    },
    {
      title: "Музыка",
      href: "music",
      class: s.blockClass,
    },
    {
      title: "Друзья",
      href: "friends",
      class: s.blockClass,
    },
    {
      title: "Чаты",
      href: "chats",
      class: s.blockClass,
    },
    {
      title: "Выйти",
      href: "logout",
      class: s.blockClass + " " + s.last,
    },
  ],
};

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { headerRoutes, routes } from "../../config/routes";
import { useEffect, useState } from "react";
import hamster from "/hamster.jpg";
import s from "./Header.module.css";
import { userStore } from "../../store/userStore";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const [isActive, setIsActive] = useState(false);
  const [menuRoutes, setMenuRoutes] = useState();
  const user = userStore.user;

  const toggleMenu = () => {
    setIsActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (user) {
      setMenuRoutes(routes.user);
  
    }
  }, [user]);

  return (
    <header className="container pt-4 mx-auto flex justify-between">
      <Link to={"/"}>
        <h2 className="text-xl font-bold">Звукс</h2>
      </Link>
      <div className="flex gap-6 text-xl items-center">
        {userStore.user && (
          <>
            {headerRoutes.map((el, i) => (
              <Link to={el.href} key={i}>
                <FontAwesomeIcon icon={el.icon} className={s.navLink} />
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center overflow-hidden rounded-md bg-white cursor-pointer"
              >
                <img
                  className="rounded-full h-10 w-10"
                  src={hamster}
                  alt="avatar"
                />
              </button>

              {isActive && (
                <div
                  className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg"
                  role="menu"
                  aria-hidden={!isActive}
                >
                  <div className="p-2">
                    {menuRoutes.map((el, i) => (
                      <Link
                        key={i}
                        to={el.href}
                        className={el.class}
                        role="menuitem"
                        onClick={() => setIsActive(false)}
                      >
                        {el.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {!userStore.user && (
          <>
            <Link to={"/login"}>
              <button className={s.login}>Войти</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
});

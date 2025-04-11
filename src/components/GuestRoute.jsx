import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

export const GuestRoute = observer(({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.isCheckingAuth) return;

    if (userStore.user) {
      navigate(-1);
    }
  }, [navigate, userStore.isCheckingAuth, userStore.user]);

  if (userStore.isCheckingAuth) {
    return <div>Загрузка...</div>;
  }

  return !userStore.user ? children : null;
});

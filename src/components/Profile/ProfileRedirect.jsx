import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";

export const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.user) {
      navigate(`/user/${userStore.user.id}`);
    }
  }, []);

  return;
};

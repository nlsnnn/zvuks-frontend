import { useEffect } from "react";
import { userStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const goLogout = async () => {
      await userStore.logout();
      navigate("/");
    };

    goLogout()
  }, [navigate]);

  return null;
};

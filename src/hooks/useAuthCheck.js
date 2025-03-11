import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/userStore";

export const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.user) {
      userStore.checkAuth().then(() => {
        if (!userStore.user) {
          navigate("/login");
        }
      });
    }
  }, [navigate]);
};

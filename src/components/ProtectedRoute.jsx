import { useEffect } from "react";
import { userStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
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

  return userStore.user ? children : null;
};

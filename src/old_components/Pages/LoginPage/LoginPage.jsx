import { useState } from "react";
import styles from "./LoginPage.module.css";
import { userStore } from "../../../store/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validateEmail } from "../../../utils";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ers = []

    if (!validateEmail(email)) {
      ers.push("Некорректный email");
    }

    if (password.length < 5) {
      ers.push("Пароль должен содержать минимум 5 символов");
    }

    if (ers.length > 0) {
      console.log(ers);
      setErrors(ers);
      return;
    }

    try {
      await userStore.login(email, password);
      if (userStore.user) {
        navigate("/");
      }
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      setErrors([errorMessage]);
    }
  };

  return (
    <>
      <main className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>Вход</h2>

        {errors.length > 0 && (
          <div className={styles.errorMessages}>
            {errors.map((error, index) => (
              <div key={index} className={styles.errorMessage}>
                {error}
              </div>
            ))}
          </div>
        )}

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Почта</label>
            <input
              type="text"
              className={styles.formInput}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Пароль</label>
            <input
              type="password"
              className={styles.formInput}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className={styles.registerLink}>
            Нет аккаунта?{" "}
            <Link to={"/register"}>
              <span className={styles.registerLinkText}>Регистрация</span>
            </Link>
          </p>
          <button type="submit" className={styles.loginButton}>
            Войти
          </button>
        </form>
      </main>
    </>
  );
};

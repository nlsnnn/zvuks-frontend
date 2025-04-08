import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";
import { useState } from "react";
import { validateEmail } from "../../../utils";
import { userStore } from "../../../store/userStore";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ers = [];

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
      const res = await userStore.register(email, username, password);
      if (res) {
        navigate("/login");
      }
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      setErrors([errorMessage]);
    }
  };

  return (
    <>
      <main className={styles.container}>
        <h2 className={styles.title}>Регистрация</h2>

        {errors.length > 0 && (
          <div className={styles.errorMessages}>
            {errors.map((error, index) => (
              <div key={index} className={styles.errorMessage}>
                {error}
              </div>
            ))}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Имя пользователя</label>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              className={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Пароль</label>
            <input
              type="password"
              className={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p>
            Есть аккаунт?{" "}
            <Link to={"/login"}>
              <span className={styles.link}>Войти</span>
            </Link>
          </p>
          <button className={styles.button}>Создать аккаунт</button>
        </form>
      </main>
    </>
  );
};

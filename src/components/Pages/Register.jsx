import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";
import { validateEmail } from "../../utils";

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ers = [];

    if (!validateEmail(email)) {
      ers.push("Некорректный email");
    }
    if (username.length < 3) {
      ers.push("Имя пользователя должно быть не менее 3 символов");
    }
    if (password.length < 5) {
      ers.push("Пароль должен содержать минимум 5 символов");
    }
    if (password !== confirmPassword) {
      ers.push("Пароли не совпадают");
    }

    if (ers.length > 0) {
      setErrors(ers);
      return;
    }

    try {
      await userStore.register(email, username, password);
      navigate("/login");
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      setErrors([errorMessage]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
        {errors.length > 0 && (
          <div className="mb-4 text-red-500">
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Имя пользователя
            </label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Введите имя пользователя"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Подтвердите пароль
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите пароль"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Войти
          </a>
        </p>
      </div>
    </div>
  );
};
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";

const schema = z.object({
  identifier: z.string().min(3, "Идентификатор обязателен"),
  password: z.string().min(5, "Пароль должен быть не менее 5 символов"),
});

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await userStore.login(data.identifier, data.password);
      if (userStore.user) {
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email или имя пользователя
            </label>
            <Input
              type="text"
              {...register("identifier")}
              placeholder="Введите email или имя пользователя"
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Пароль
            </label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Введите пароль"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Войти
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Регистрация
          </a>
        </p>
      </div>
    </div>
  );
};

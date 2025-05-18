import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const schema = z.object({
  identifier: z
    .string()
    .min(3, "Идентификатор слишком короткий")
    .transform((v) => v.toLocaleLowerCase().replace(/\s+/g, "_")),
  password: z.string().min(5, "Пароль должен быть не менее 5 символов"),
  other: z.string().optional(),
});

export const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setFocus("identifier");
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await userStore.login(data.identifier, data.password);
      if (res) {
        userStore.checkAuth();
        navigate("/");
      }
      console.log(errors);
    } catch (e) {
      setError("other", { type: "custom", message: e.message });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Email или имя пользователя</label>
            <Input
              type="text"
              {...register("identifier")}
              placeholder="Введите email или имя пользователя"
              className="bg-gray-100 text-sm"
            />
            {errors.identifier && (
              <p className="form-error">{errors.identifier.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Пароль</label>
            <Input
              type="password"
              {...register("password")}
              placeholder="Введите пароль"
              className="bg-gray-100 text-sm"
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>
          {errors.other && (
            <p className="form-error text-center">{errors.other.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Войти
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm">
          <p className="text-gray-600">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Регистрация
            </Link>
          </p>
          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Забыли пароль?
          </Link>
        </div>
      </div>
    </div>
  );
};

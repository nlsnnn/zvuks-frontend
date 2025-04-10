import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Имя пользователя слишком короткое")
      .max(20, "Имя пользователя слишком длинное")
      .transform((v) => v.toLowerCase().replace(/\s+/g, "_")),
    email: z.string().email("Некорректный email"),
    password: z.string().min(5, "Пароль слишком короткий"),
    confirmPassword: z.string().min(5, "Повторите пароль"),
    other: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Введеные пароли не совпадают",
  });

export const Register = () => {
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
    setFocus("email");
  }, []);

  const onSubmit = async (data) => {
    try {
      await userStore.register(data.email, data.username, data.password);
      navigate("/login");
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      setError("other", { type: "custom", message: errorMessage });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="form-label">Email</label>
            <Input
              type="email"
              {...register("email")}
              placeholder="Введите email"
              className="bg-gray-100 text-sm"
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="form-label">Имя пользователя</label>
            <Input
              type="text"
              {...register("username")}
              placeholder="Введите имя пользователя"
              className="bg-gray-100 text-sm"
            />
            {errors.username && (
              <p className="form-error">{errors.username.message}</p>
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
          <div>
            <label className="form-label">Подтвердите пароль</label>
            <Input
              type="password"
              {...register("confirmPassword")}
              placeholder="Подтвердите пароль"
              className="bg-gray-100 text-sm"
            />
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>
          {errors.other && (
            <p className="form-error text-center">{errors.other.message}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

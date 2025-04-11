import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";

const schema = z
  .object({
    password: z.string().min(5, "Новый пароль слишком короткий"),
    confirmPassword: z.string().min(5, "Повторите новый пароль"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Введеные пароли не совпадают",
  });

export const ResetPasswordConfirm = () => {
  const { token } = useParams();
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
    setFocus("password");
    console.log(token);
  }, []);

  const onSubmit = async (data) => {
    try {
      await userStore.resetPasswordConfirm(token, data.password);
      navigate("/login");
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      setError("newPassword", { type: "custom", message: errorMessage });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Восстановление пароля
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="form-label">Пароль</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="Введите новый пароль"
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
                placeholder="Подтвердите новый пароль"
                className="bg-gray-100 text-sm"
              />
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Восстановить
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { userStore } from "../../store/userStore";
import { Input } from "../UI/Input";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Некорректный email"),
});

export const ResetPassword = () => {
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
      await userStore.resetPasswordRequest(data.email);
      toast.success("Письмо для сброса пароля отправлено", {
        position: "top-center",
        closeOnClick: true,
      });
    } catch (e) {
      const errorMessage = e.message || "Неизвестная ошибка";
      toast.error(errorMessage, {
        position: "top-center",
        hideProgressBar: true,
        closeOnClick: true,
      });
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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Сбросить пароль
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            <Link to="/login" className="text-blue-600 hover:underline">
              Войти в аккаунт
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

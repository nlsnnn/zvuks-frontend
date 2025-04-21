import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { observer } from "mobx-react-lite";
import { userStore } from "../../store/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const schema = z.object({
  description: z.string().max(100, "Описание не может превышать 100 символов"),
  avatar: z
    .any()
    .optional()
    .refine((file) => !file || file instanceof File, {
      message: "Неверный формат файла",
    })
    .refine((file) => !file || file.size < 5 * 1024 * 1024, {
      message: "Размер файла не должен превышать 5 МБ",
    }),
});

export const EditProfile = observer(() => {
  const user = userStore.user;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      description: user.description || "",
      avatar: null,
    },
  });

  const [preview, setPreview] = useState(user?.avatar || null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarFile = watch("avatar");
  const navigate = useNavigate();

  useEffect(() => {
    if (avatarFile && avatarFile instanceof File) {
      const url = URL.createObjectURL(avatarFile);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const success = await userStore.updateProfile(data);
    if (success) {
      navigate("/profile");
      toast.success("Профиль успешно обновлён");
    } else {
      toast.error("Ошибка при обновлении профиля");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 glass-section mt-10">
      <h1 className="text-2xl font-bold mb-6">Редактировать профиль</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="form-label">Имя пользователя</label>
          <input
            type="text"
            value={user?.username || ""}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <div>
          <label className="form-label">Описание</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-md"
            placeholder="Введите описание"
          />
          {errors.description && (
            <p className="form-error">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Аватар</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setValue("avatar", e.target.files[0])}
            className="file-input"
          />
          {errors.avatar && (
            <p className="form-error">{errors.avatar.message}</p>
          )}
          {preview && (
            <img
              src={preview}
              alt="avatar preview"
              className="mt-3 w-32 h-32 rounded-full object-cover border"
            />
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          {isLoading ? "Загрузка..." : "Сохранить изменения"}
        </button>
      </form>
    </div>
  );
});

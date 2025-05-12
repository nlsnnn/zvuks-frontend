import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { playlistStore } from "../../store/playlistStore";

const schema = z.object({
  title: z.string().min(1, "Введите название"),
  cover: z
    .any()
    .optional()
    .refine((f) => !f || (f instanceof File && f.size < 5 * 1024 * 1024), {
      message: "Обложка должна быть < 5 МБ",
    }),
  isPrivate: z.boolean().optional(),
});

export const AddPlaylist = observer(() => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      cover: undefined,
      isPrivate: false,
    },
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("is_private", data.isPrivate);
    if (data.cover) formData.append("cover", data.cover);

    const success = await playlistStore.addPlaylist(formData);
    if (success) {
      navigate("/playlists");
    } else {
      alert("Не удалось создать плейлист");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 glass-section mt-10">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">Создать плейлист</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="form-label">Название</label>
          <input
            type="text"
            {...register("title")}
            className="w-full p-2 border rounded-md"
            placeholder="Мой любимый плейлист"
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="form-label">Обложка</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setValue("cover", file);
                setCoverPreview(URL.createObjectURL(file));
              }
            }}
            className="w-full"
          />
          {errors.cover && <p className="form-error">{errors.cover.message}</p>}
          {coverPreview && (
            <img
              src={coverPreview}
              alt="cover preview"
              className="mt-3 w-40 h-40 object-cover rounded-md border"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="private" {...register("isPrivate")} />
          <label htmlFor="private" className="form-label mb-0">
            Приватный плейлист
          </label>
        </div>

        <button type="submit" className="btn-primary w-full">
          Создать плейлист
        </button>
      </form>
    </div>
  );
});

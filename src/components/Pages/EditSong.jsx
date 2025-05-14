import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { songStore } from "../../store/songStore";
import { toast } from "react-toastify";

const schema = z.object({
  title: z.string().min(1, "Введите название"),
  releaseDate: z.string().min(1, "Укажите дату релиза"),
  trackNumber: z.number().min(1).max(99).optional(),
  albumId: z.union([z.string(), z.number()]).optional(),
  cover: z.any().optional(),
});

export const EditSong = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialSong, setInitialSong] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    songStore.getSong(+id).then((data) => {
      setInitialSong(data);
      setValue("title", data.title);
      setValue("releaseDate", data.releaseDate?.slice(0, 16));
      setValue("trackNumber", data.trackNumber ?? undefined);
      setValue("albumId", data.album?.id ?? undefined);
      setPreview(data.cover);
    });
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      name: data.title,
      releaseDate: data.releaseDate,
      albumId: data.albumId ?? undefined,
      trackNumber: data.trackNumber ?? undefined,
    };

    const success = await songStore.updateSong(+id, payload);
    if (success) {
      navigate("/artist/manage");
      toast.success("Песня успешно обновлена");
    } else {
      toast.error("Не удалось обновить песню");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 glass-section">
      <h1 className="text-2xl font-bold mb-6">Редактировать песню</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="form-label">Название</label>
          <input
            {...register("title")}
            className="w-full p-2 border rounded-md"
            placeholder="Название песни"
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div>
          <label className="form-label">Дата релиза</label>
          <input
            type="datetime-local"
            {...register("releaseDate")}
            className="w-full p-2 border rounded-md"
          />
          {errors.releaseDate && (
            <p className="form-error">{errors.releaseDate.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Трек # (в альбоме)</label>
          <input
            type="number"
            {...register("trackNumber", { valueAsNumber: true })}
            className="w-full p-2 border rounded-md"
            min={1}
          />
          {errors.trackNumber && (
            <p className="form-error">{errors.trackNumber.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Альбом (ID)</label>
          <input
            type="text"
            {...register("albumId")}
            className="w-full p-2 border rounded-md"
          />
          {errors.albumId && (
            <p className="form-error">{errors.albumId.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Обложка</label>
          {preview && (
            <img
              src={preview}
              alt="cover preview"
              className="mt-3 w-40 h-40 object-cover rounded-md border"
            />
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
});

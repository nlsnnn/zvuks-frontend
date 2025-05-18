import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Artists } from "../Features/Add/Artists";
import { songStore } from "../../store/songStore";
import { toast } from "react-toastify";

const schema = z.object({
  title: z.string().min(1, "Введите название"),
  releaseDate: z
    .string()
    .min(1, "Укажите дату релиза")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Неверный формат даты",
    })
    .refine(
      (val) => {
        const date = Date.parse(val);
        const currentDate = Date.now();
        const oneYearInMs = 365 * 24 * 60 * 60 * 1000;

        return (
          date >= currentDate - oneYearInMs && date <= currentDate + oneYearInMs
        );
      },
      {
        message: "Дата должна быть в пределах одного года от текущей",
      }
    ),
  cover: z
    .any()
    .refine((file) => file instanceof File && file.size < 5 * 1024 * 1024, {
      message: "Размер обложки не должен превышать 5 МБ",
    }),
  audio: z
    .any()
    .refine((file) => file instanceof File && file.size < 10 * 1024 * 1024, {
      message: "Размер аудиофайла не должен превышать 10 МБ",
    }),
  notifyUsers: z.boolean().optional(),
});

export const AddSong = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const coverFile = watch("cover");
  const audioFile = watch("audio");

  const onSubmit = async (data) => {
    if (!selectedAuthors.length) {
      setError("Выберите хотя бы одного артиста");
      return;
    }

    if (songStore.loading) {
      toast.loading("Загрузка...", {
        autoClose: 2000,
      });
      return;
    }

    const artists = selectedAuthors.map((a) => a.id).join(",");
    const date = new Date(data.releaseDate).toISOString().slice(0, 16);

    const success = await songStore.addSong(
      data.title,
      date,
      artists,
      data.cover,
      data.audio,
      data.notifyUsers
    );
    if (success) {
      navigate("/");
    } else {
      setError("Не удалось добавить песню");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 glass-section mt-10">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">
        Добавить песню
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="form-label">Название</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Введите название песни"
            className="form-input"
          />
          {errors.title && <p className="form-error">{errors.title.message}</p>}
        </div>

        <div>
          <Artists
            selectedAuthors={selectedAuthors}
            setSelectedAuthors={setSelectedAuthors}
          />
        </div>

        <div>
          <label className="form-label">Дата релиза</label>
          <input
            type="datetime-local"
            {...register("releaseDate")}
            className="form-input"
          />
          {errors.releaseDate && (
            <p className="form-error">{errors.releaseDate.message}</p>
          )}
        </div>

        <div>
          <label className="form-label">Обложка</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setValue("cover", e.target.files[0])}
            className="w-full"
          />
          {errors.cover && <p className="form-error">{errors.cover.message}</p>}
          {coverFile && (
            <img
              src={URL.createObjectURL(coverFile)}
              alt="Предпросмотр"
              className="mt-2 w-40 h-40 object-cover rounded-md shadow"
            />
          )}
        </div>

        <div>
          <label className="form-label">Аудиофайл</label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setValue("audio", e.target.files[0])}
            className="w-full"
          />
          {errors.audio && <p className="form-error">{errors.audio.message}</p>}
          {audioFile && (
            <p className="text-sm text-[var(--color-muted)] mt-1">
              Файл: {audioFile.name}
            </p>
          )}
        </div>

        <div>
          <label className="inline-flex items-center">
            <input type="checkbox" {...register("notifyUsers")} />
            <span className="ml-2">Уведомить пользователей</span>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={songStore.loading}
        >
          {songStore.loading ? "Загрузка..." : "Добавить песню"}
        </button>
      </form>
    </div>
  );
});

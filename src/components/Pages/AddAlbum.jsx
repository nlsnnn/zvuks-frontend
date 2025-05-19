import { FormProvider, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { albumStore } from "../../store/albumStore";
import { schema } from "../../schemas/addAlbum";
import { AlbumSongForm } from "../Features/Add/AlbumSongForm";
import { toast } from "react-toastify";

export const AddAlbum = observer(() => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { songs: [] },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const { fields, append, remove } = useFieldArray({ control, name: "songs" });
  const [coverPreview, setCoverPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const songFiles = [];
      const songNames = [];
      const trackNumbers = [];
      const songArtistsMatrix = [];

      data.songs.forEach((song) => {
        songFiles.push(song.audio);
        songNames.push(song.title);
        trackNumbers.push(song.trackNumber);
        songArtistsMatrix.push(song.artists.map((a) => a.id));
      });

      const title = data.title;
      const releaseDate = new Date(data.releaseDate).toISOString().slice(0, 16);
      const cover = data.cover;
      const notifyUsers = data.notifyUsers;

      const response = await albumStore.addAlbum(
        title,
        releaseDate,
        cover,
        songFiles,
        songNames,
        trackNumbers,
        songArtistsMatrix,
        notifyUsers
      );

      if (response) navigate("/");
      else toast.error("Ошибка при добавлении альбома");
    } catch (err) {
      toast.error("Произошла ошибка: " + err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 glass-section mt-10">
      <h1 className="text-2xl font-bold mb-6 text-[var(--color-dark)]">
        Создать альбом
      </h1>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="form-label">Название альбома</label>
            <input type="text" {...register("title")} className="form-input" />
            {errors.title && (
              <p className="form-error">{errors.title.message}</p>
            )}
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
            <label className="form-label ">Обложка</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue("cover", e.target.files[0]);
                setCoverPreview(URL.createObjectURL(e.target.files[0]));
              }}
              className="file-input"
            />
            {errors.cover && (
              <p className="form-error">{errors.cover.message}</p>
            )}
            {coverPreview && (
              <img
                src={coverPreview}
                alt="preview"
                className="mt-2 w-40 h-40 object-cover rounded-md"
              />
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Список песен</h2>
            {fields.map((field, index) => (
              <AlbumSongForm key={field.id} index={index} remove={remove} />
            ))}

            {fields.length < 50 && (
              <button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    trackNumber: fields.length + 1,
                    artists: [],
                    audio: null,
                  })
                }
                className="btn-outline"
              >
                + Добавить песню
              </button>
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Загрузка..." : "Создать альбом"}
          </button>
        </form>
      </FormProvider>
    </div>
  );
});

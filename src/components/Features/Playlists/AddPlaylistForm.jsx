import { useNavigate } from "react-router-dom";
import { playlistStore } from "../../../store/playlistStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../../schemas/addPlaylist";
import { toast } from "react-toastify";

export const AddPlaylistForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const navigate = useNavigate();
  const coverFile = watch("cover");

  const onSubmit = async (data) => {
    const form = new FormData();
    form.append("name", data.name);
    form.append("cover", data.cover);
    form.append("private", data.isPrivate);
    const success = await playlistStore.addPlaylist(form);
    if (success) {
      navigate("/playlists");
      toast.success("Плейлист успешно создан");
    } else {
      toast.error("Ошибка при добавлении плейлиста");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 glass-section p-6 max-w-lg mx-auto"
    >
      <div>
        <label className="form-label">Название плейлиста</label>
        <input
          type="text"
          {...register("name")}
          placeholder="Введите название плейлиста"
          className="form-input"
        />
        {errors.name && <p className="form-error">{errors.name.message}</p>}
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
      <div className="flex items-center gap-2">
        <input
          id="private"
          type="checkbox"
          {...register("isPrivate")}
          checked={watch("isPrivate")}
        />
        <label htmlFor="private">Приватный</label>
        {errors.isPrivate && (
          <p className="form-error">{errors.isPrivate.message}</p>
        )}
      </div>
      <button type="submit" className="btn-primary w-full">
        Создать
      </button>
    </form>
  );
};

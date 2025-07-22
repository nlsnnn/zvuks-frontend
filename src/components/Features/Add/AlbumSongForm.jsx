import { useFormContext } from "react-hook-form";
import { Artists } from "./Artists";

export const AlbumSongForm = ({ index, remove }) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const artistsValue = watch(`songs.${index}.artists` || []);

  return (
    <div className="glass-card p-4 rounded-xl space-y-4">
      <div>
        <label className="form-label">Название</label>
        <input
          type="text"
          {...register(`songs.${index}.title`)}
          className="form-input"
        />
        {errors.songs?.[index]?.title && (
          <p className="form-error">{errors.songs[index].title.message}</p>
        )}
      </div>
      <div>
        <Artists
          selectedAuthors={artistsValue}
          setSelectedAuthors={(authors) =>
            setValue(`songs.${index}.artists`, authors, {
              shouldValidate: true,
              shouldTouch: true,
              shouldDirty: true,
            })
          }
        />
        {errors.songs?.[index]?.title && (
          <p className="form-error">{errors.songs[index].artists.message}</p>
        )}
      </div>
      <div>
        <label className="form-label">Номер трека</label>
        <input
          type="number"
          {...register(`songs.${index}.trackNumber`, { valueAsNumber: true })}
          min={1}
          max={50}
          className="form-input w-24"
        />
        {errors.songs?.[index]?.trackNumber && (
          <p className="form-error">
            {errors.songs[index].trackNumber.message}
          </p>
        )}
      </div>
      <div>
        <label className="form-label">Аудиофайл</label>
        <input
          type="file"
          accept=".mp3,audio/mpeg,audio/*"
          onChange={(e) =>
            setValue(`songs.${index}.audio`, e.target.files[0], {
              shouldValidate: true,
              shouldTouch: true,
              shouldDirty: true,
            })
          }
          className="file-input"
        />
        {errors.songs?.[index]?.audio && (
          <p className="form-error">{errors.songs[index].audio.message}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => remove(index)}
        className="text-red-500 hover:text-red-600 mt-2 cursor-pointer"
      >
        Удалить
      </button>
    </div>
  );
};

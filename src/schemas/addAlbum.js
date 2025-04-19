import * as z from "zod";

const songSchema = z.object({
  title: z.string().min(1, "Введите название трека"),
  trackNumber: z.number().int().min(1, "Минимум 1").max(50, "Максимум 50"),
  artists: z
    .array(z.object({ id: z.number().int(), username: z.string() }))
    .min(1, "Укажите артистов"),
  audio: z.any().refine((f) => f instanceof File && f.size < 10 * 1024 * 1024, {
    message: "Аудиофайл должен быть < 10 МБ",
  }),
});

export const schema = z.object({
  title: z.string().min(1, "Введите название альбома"),
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
  cover: z.any().refine((f) => f instanceof File && f.size < 5 * 1024 * 1024, {
    message: "Обложка должна быть < 5 МБ",
  }),
  songs: z.array(songSchema).max(50, "Максимум 50 песен"),
});

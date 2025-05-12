import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Введите название плейлиста"),
  cover: z.any().refine((f) => f instanceof File && f.size < 5 * 1024 * 1024, {
    message: "Обложка должна быть < 5 МБ",
  }),
  isPrivate: z.boolean(),
});

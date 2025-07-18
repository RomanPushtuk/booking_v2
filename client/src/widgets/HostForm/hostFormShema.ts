import * as z from "zod";

const hostFormShema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  workingDays: z.array(z.string()).nonempty(),
  workingHours: z
    .array(
      z.object({
        start: z.string().min(1),
        end: z.string().min(1),
      }),
    )
    .nonempty(),
  login: z.string().min(6),
  password: z.string().min(6),
});

export { hostFormShema };

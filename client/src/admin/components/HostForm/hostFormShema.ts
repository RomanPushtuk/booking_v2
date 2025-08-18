import * as z from "zod";

export const updateShema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  forwardBooking: z.string().nonempty(),
  workingDays: z.array(z.string()).nonempty(),
  workingHours: z
    .array(
      z.object({
        start: z.string().min(1),
        end: z.string().min(1),
      }),
    )
    .nonempty(),
});

export const createShema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  forwardBooking: z.string().nonempty(),
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

export type UpdateHostShemaType = z.infer<typeof updateShema>;
export type CreateHostShemaType = z.infer<typeof createShema>;

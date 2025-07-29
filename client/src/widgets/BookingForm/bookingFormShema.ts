import * as z from "zod";

export const bookingFormShema = z.object({
  clientId: z.string().nonempty(),
  hostId: z.string().nonempty(),
  timeSlot: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
});

export type BookingShemaType = z.infer<typeof bookingFormShema>

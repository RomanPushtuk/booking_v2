import * as z from "zod";

const bookingFormShema = z.object({
  clientId: z.string().nonempty(),
  hsotId: z.string().nonempty(),
  timeSlot: z.object({
    start: z.string().min(1),
    end: z.string().min(1),
  }),
});

export { bookingFormShema };

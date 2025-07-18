import * as z from "zod";

const clientFormShema = z.object({
  name: z.string().nonempty(),
  login: z.string().min(6),
  password: z.string().min(6),
});

export { clientFormShema };

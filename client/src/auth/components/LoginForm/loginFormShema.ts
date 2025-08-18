import * as z from "zod";

const loginFormShema = z.object({
  login: z.string().min(6),
  password: z.string().min(6),
});

export { loginFormShema };

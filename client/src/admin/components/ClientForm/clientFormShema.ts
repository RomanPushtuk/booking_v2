import * as z from "zod";

export const updateClientFormShema = z.object({
  name: z.string().optional(),
});

export const createClientFormShema = z.object({
  name: z.string().optional(),
  login: z.string().min(6),
  password: z.string().min(6),
});

export type UpdateClientShemaType = z.infer<typeof updateClientFormShema>;
export type CreateClientShemaType = z.infer<typeof createClientFormShema>;

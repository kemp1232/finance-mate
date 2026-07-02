import { z } from "zod";

export const meResponseSchema = z.object({
  data: z.object({
    id: z.string(),
    email: z.string().email(),
    createdAt: z.string(),
  }),
});

export type MeResponse = z.infer<typeof meResponseSchema>;

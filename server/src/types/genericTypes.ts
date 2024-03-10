import { z } from "zod";

export const IdSchema = z.number().int().gte(0);

export type Id = z.infer<typeof IdSchema>

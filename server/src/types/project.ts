import { z } from "zod";

export const ProjectCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    key: z.string().optional()
})

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>
import { z } from "zod";

export const ProjectCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    key: z.string().optional()
})

export const ViewCreateSchema = z.object({
    name: z.string(),
    description: z.string()
})

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type ViewCreate = z.infer<typeof ViewCreateSchema>;
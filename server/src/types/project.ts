import { z } from "zod";

export const ProjectCreateSchema = z.object({
    name: z.string(),
    description: z.string(),
    key: z.string().optional()
})

export const NameAndDescriptionSchema = z.object({
    name: z.string(),
    description: z.string()
})

export const OrderNumberSchema = z.number().int().gt(0)

export const BoardColumnCreateSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    orderNumber: OrderNumberSchema
})

export type ProjectCreate = z.infer<typeof ProjectCreateSchema>;
export type NameAndDescription = z.infer<typeof NameAndDescriptionSchema>;
export type BorderColumnCreate = z.infer<typeof BoardColumnCreateSchema>;
export type OrderNumber = z.infer<typeof OrderNumberSchema>;
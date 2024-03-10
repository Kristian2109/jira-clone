import { z } from "zod";
import { NameAndDescriptionSchema, OrderNumberSchema } from "./project";
import { IdSchema } from "./genericTypes";

export const IssueFieldDataTypeSchema = z.enum(["string", "number", "array", "person"]);

export const IssueFieldCreateSchema = NameAndDescriptionSchema.extend({
    orderNumber: OrderNumberSchema,
    dataType: IssueFieldDataTypeSchema
})

export const IssueFieldContentSchema = z.object({
    content: z.string(),
    issueFieldId: IdSchema
})

export const IssueCreateSchema = z.object({
    summary: z.string(),
    issueTypeId: z.number().int().gte(0),
    fields: z.array(IssueFieldContentSchema).optional(),
    boardColumnId: IdSchema.optional()
})

export const IssueUpdateSchema = z.object({
    summary: z.string().optional(),
    fields: z.array(IssueFieldContentSchema).optional(),
    isCompleted: z.boolean().optional()
})

export type IssueFieldCreate = z.infer<typeof IssueFieldCreateSchema>
export type IssueCreate = z.infer<typeof IssueCreateSchema>
export type IssueFieldContentCreate = z.infer<typeof IssueFieldContentSchema>
export type IssueFieldDataType = z.infer<typeof IssueFieldDataTypeSchema>
export type IssueUpdate = z.infer<typeof IssueUpdateSchema>;
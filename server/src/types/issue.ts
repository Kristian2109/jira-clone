import { z } from "zod";
import { NameAndDescriptionSchema, OrderNumberSchema } from "./project";

export const IssueFieldDataTypeSchema = z.enum(["string", "number", "array", "person"]);

export const IssueFieldCreateSchema = NameAndDescriptionSchema.extend({
    orderNumber: OrderNumberSchema,
    dataType: IssueFieldDataTypeSchema
})

export const IssueFieldContentSchema = z.object({
    content: z.string(),
    issueFieldId: z.number().int().gte(0)
})

export const IssueCreateSchema = z.object({
    summary: z.string(),
    issueTypeId: z.number().int().gte(0),
    fields: z.array(IssueFieldContentSchema).optional()
})

export type IssueFieldCreate = z.infer<typeof IssueFieldCreateSchema>
export type IssueCreate = z.infer<typeof IssueCreateSchema>
export type IssueFieldContent = z.infer<typeof IssueFieldContentSchema>
export type IssueFieldDataType = z.infer<typeof IssueFieldDataTypeSchema>
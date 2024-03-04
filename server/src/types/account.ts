import {z} from "zod"

export const AddressSchema = z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
    streetName: z.string(),
    streetNumber: z.number(),
    postalCode: z.string()
})

export const UserAccountSchema = z.object({
    name: z.string(),
    email: z.string(),
    displayName: z.string().optional(),
    dateOfBirth: z.string().optional(),
    position: z.string().optional(),
    organization: z.string().optional(),
    address: AddressSchema.optional()
})

export const UserAccountSchemaWithPass = UserAccountSchema.extend({
    password: z.string()
})


export const LoginSchema = z.object({
    email: z.string(),
    password: z.string()
})

export type RegisterUserSchema = z.infer<typeof UserAccountSchema>;
export type RegisterAddressSchema = z.infer<typeof AddressSchema>;
export type RegisterUserSchemaWIthPass = z.infer<typeof UserAccountSchemaWithPass>;
export type Login = z.infer<typeof LoginSchema>;

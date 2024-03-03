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
    displayName: z.string(),
    dateOfBirth: z.string(),
    position: z.string(),
    organization: z.string(),
    password: z.string(),
    address: AddressSchema
})

export type RegisterUserSchema = z.infer<typeof UserAccountSchema>;
export type RegisterAddressSchema = z.infer<typeof AddressSchema>;

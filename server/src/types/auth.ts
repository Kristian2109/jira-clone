import { IntegerType } from "typeorm";
import Address from "../entities/account/address";
import { Request } from "express";
import { z } from "zod";
import { IdSchema } from "./genericTypes";

export const UserRoleSchema = z.enum(["user", "admin"])

export const CreateAddressSchema = z.object({
    country: z.string(),
    state: z.string(),
    city: z.string(),
    streetName: z.string().optional(),
    streetNumber: IdSchema.optional(),
    postalCode: z.string()
})

export const RegisterUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    displayName: z.string(),
    dateOfBirth: z.date(),
    position: z.string(),
    organization: z.string(),
    password: z.string(),
    address: CreateAddressSchema.optional(),
});

export const AuthenticationPayloadSchema = z.object({
    user: z.object({
        id: z.number(),
        role: UserRoleSchema
    })
})

export type UserRole = z.infer<typeof UserRoleSchema>;
export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export type FullUserDetails = {
    id: IntegerType,
    name: string;
    email: string;
    displayName?: string;
    dateOfBirth?: Date;
    position?: string;
    organization?: string;
    createdAt: Date;
    address?: Address;
    role: UserRole
}

export interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: UserRole
    }
}
import { IntegerType } from "typeorm";
import Address from "../entities/account/address";
import { Request } from "express";

export type RegisterUser = {
    name: string;
    email: string;
    displayName: string;
    dateOfBirth: Date;
    position: string;
    organization: string;
    password: string;
    address: Address;
};

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
}

export interface AuthenticatedRequest extends Request {
    user: {
        id: number;
    }
}
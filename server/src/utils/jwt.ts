import  dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../constants";

dotenv.config()

export function signToken(payload: object): string {
    const expiresIn = process.env.JWT_EXPIRATION_TIME || "24h";
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn
    })
}
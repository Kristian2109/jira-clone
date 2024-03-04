import  dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

export function signToken(payload: object): string {
    const secret = process.env.JWT_SECRET || "Default jwt secret";
    const expiresIn = process.env.JWT_EXPIRATION_TIME || "24h";
    return jwt.sign(payload, secret, {
        expiresIn
    })
}
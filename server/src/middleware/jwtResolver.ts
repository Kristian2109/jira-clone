import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from '../constants';
import { AuthenticatedRequest, UserRole, UserRoleSchema } from '../types/auth';
import { Id, IdSchema } from '../types/genericTypes';

dotenv.config()

class JwtResolver {
    public static async resolve(req: AuthenticatedRequest, res: Response) {
        // Extract headers from the request
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            return res.sendStatus(401);
        }

        const [tokenType, token] = authHeader.split(' ');
        if (tokenType !== "Bearer") {
            return res.sendStatus(401);
        }

        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
            if (typeof payload === "string") {
                throw new Error();
            }
        } catch (error) {
            return res.sendStatus(401);
        }
        
        let userId: Id;
        let role: UserRole;
        try {
            userId = IdSchema.parse(payload.userId);
            role = UserRoleSchema.parse(payload.role);
        } catch (error) {
            return res.sendStatus(401);
        }

        req.user = {
            id: userId,
            role
        }
    }
}

export default JwtResolver;
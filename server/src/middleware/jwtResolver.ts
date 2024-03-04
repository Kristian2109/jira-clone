import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from '../constants';
import { IntegerType } from 'typeorm';
import { AuthenticatedRequest } from '../types/auth';

dotenv.config()

class JwtResolver {
    static resolve(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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
        
        const userId: IntegerType | undefined = Number(payload?.userId);
        if (!userId) {
            return res.sendStatus(401);
        }

        req.user = {
            id: userId
        }

        next();
    }
}

export default JwtResolver;
import { NextFunction, Request, Response } from "express";
import GenericException from "../exceptions/genericException";

export default class ErrorHandler {
    public static handleError(err: Error, req: Request, res: Response, next: NextFunction) {
        console.log("Heyyyyyyy");
        if (err instanceof GenericException) {
            console.error(err.toString(), err.statusCode);
            return res.status(err.statusCode).json({error: err.message});
        } else {
            console.error(err);
            return res.status(500).json({error: err.toString()});
        }
    }
}
import { NextFunction, Request, Response } from "express";
import GenericException from "../exceptions/genericException";
import CustomError from "../exceptions/customError";
import { ZodError } from "zod";

export default class ErrorHandler {
  public static handleError(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err instanceof GenericException) {
      console.error(err.toString(), err.statusCode);
      return res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof CustomError) {
      console.error(
        JSON.stringify({
          code: err.statusCode,
          context: err.errors,
          stack: err.stack,
        })
      );
      return res.status(err.statusCode).json({ error: err.errors });
    } else if (err instanceof ZodError) {
      const errorMessages = JSON.parse(err.message);
      console.error(err);
      return res.status(400).json({ error: errorMessages[0] });
    }

    console.error(err.message, "\n");
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

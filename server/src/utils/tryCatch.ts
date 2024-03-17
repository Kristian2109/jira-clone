import { NextFunction, Request, Response } from "express";

const tryCatch =
  (middleware: any) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await middleware(req);
      next();
    } catch (error) {
      next(error);
    }
  };

export default tryCatch;

import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod/v3";

export const validateRequest =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const details = error.errors?.map((e: any) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res.status(400).json({
        message_code: "VALIDATION_ERROR",
        message: "Invalid request body",
        details,
        isSuccess: false,
      });
    }
  };

import { NextFunction, Request, Response } from "express";
import { CustomError } from "./custom-error";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ValidationError } from "class-validator";
import { StatusCodes } from "http-status-codes";

export class ErrorHandler {
  public static handle(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (err) {
      if (err instanceof CustomError) {
        return BaseHttpResponse.error(err.message, err.status);
      }
      if (err instanceof ValidationError) {
        return BaseHttpResponse.error(err.message, StatusCodes.BAD_REQUEST);
      }
      return BaseHttpResponse.error(
        err.message,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return next();
  }
}

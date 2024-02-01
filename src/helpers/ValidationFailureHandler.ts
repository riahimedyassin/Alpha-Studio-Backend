import { ValidationError } from "class-validator";
import { CustomError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

export const validationFailureHandler = (err: ValidationError[]): void => {
    console.log(err)
  if (err.length === 0) return;
  return CustomError.throw(err, StatusCodes.BAD_REQUEST);
};

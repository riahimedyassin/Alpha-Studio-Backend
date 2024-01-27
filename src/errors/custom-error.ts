import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { StatusCodeResult } from "inversify-express-utils/lib/results";

export class CustomError extends Error {
  constructor(
    public readonly message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    public readonly status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
  }
}

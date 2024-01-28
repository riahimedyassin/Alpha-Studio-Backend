import { StatusCodes, ReasonPhrases } from "http-status-codes";

export class CustomError extends Error {
  constructor(
    public readonly message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    public readonly status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message);
  }
  public static throw(message?: string, status?: number) {
    throw new this(message, status);
  }
}

import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { TYPES } from "../constants/TYPES";
import { AuthService } from "../services/auth/AuthService";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/custom-error";

export class ClientMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AuthService) private readonly _authService: AuthService
  ) {
    super();
  }
  handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    const id = res.get("id");
    const exist = this._authService.existEntity(id!, "Client");
    if (!exist) {
      res.status(StatusCodes.FORBIDDEN).json({
        error: ReasonPhrases.FORBIDDEN,
        status: StatusCodes.FORBIDDEN,
      });
      return;
    }
    next();
  }
}

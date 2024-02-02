import { Request, Response, NextFunction, raw } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { AuthService } from "../services/auth/AuthService";
import { CustomError } from "../errors/custom-error";

export class AuthMiddleware extends BaseMiddleware {
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
    try {
      const payload = req.get("Authorization");
      if (!payload) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        });
        return;
      }
      if (!payload.includes("Bearer")) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        });
        return;
      }
      const rawToken = payload.split(" ")[1];
      if (!rawToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        });
        return;
      }
      const verfication = this._authService.verifyToken(rawToken);
      if (!verfication) {
        res.status(StatusCodes.UNAUTHORIZED).json({
          error: ReasonPhrases.UNAUTHORIZED,
          status: StatusCodes.UNAUTHORIZED,
        });
        return;
      }
      res.set("id", `${verfication}`);
      next();
    } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        error: ReasonPhrases.UNAUTHORIZED,
        status: StatusCodes.UNAUTHORIZED,
      });
      return;
    }
  }
}

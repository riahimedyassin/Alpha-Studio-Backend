import { Request, Response, NextFunction, raw } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { inject } from "inversify";
import { TYPES } from "../constants/TYPES";
import { AuthService } from "../services/auth/AuthService";

export class AuthMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AuthService) private readonly _authService: AuthService
  ) {
    super();
  }
  private _unAuthResponse = BaseHttpResponse.error(
    ReasonPhrases.UNAUTHORIZED,
    StatusCodes.UNAUTHORIZED
  );
  handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    try {
      const payload = req.get("Authorization");
      if (!payload) return this._unAuthResponse;
      if (!payload.includes("Bearer")) return this._unAuthResponse;
      const rawToken = payload.split(" ")[1];
      if (!rawToken) return this._unAuthResponse;
      const verfication = this._authService.verifyToken(rawToken);
      if (!verfication) return this._unAuthResponse;
      res.set("id", verfication.toString());
      next();
    } catch (error) {
      return this._unAuthResponse;
    }
  }
}

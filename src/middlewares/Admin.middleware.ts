import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { TYPES } from "../constants/TYPES";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth/AuthService";

export class AdminMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AuthService)
    private readonly _authService: AuthService
  ) {
    super();
  }
  private _forbiddenResponse = BaseHttpResponse.error(
    ReasonPhrases.FORBIDDEN,
    StatusCodes.FORBIDDEN
  );
  handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): void {
    // const id = req.get("id");
    // const exist = this._authService.existEntity(id!, "Admin");
    // if (!exist){
    //   res.status(403).json({message : "UNAUTH"})
    //   return ; 
    // };
    // next();
  }
}

import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { inject } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { ParsedQs } from "qs";
import { TYPES } from "../constants/TYPES";
import { AdminRepository } from "../repositories/admin/AdminRepository";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export class AdminMiddleware extends BaseMiddleware {
  constructor(
    @inject(TYPES.AdminRepository)
    private readonly _adminRepositroy: AdminRepository
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
    const id = req.get("id");
    const exist = this._adminRepositroy.repos.findOneBy({ id: Number(id) });
    if (!exist) return this._forbiddenResponse;
    next();
  }
}

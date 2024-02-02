import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { PointService } from "../services/point/PointService";
import { ClientService } from "../services/client/ClientService";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { StatusCodes } from "http-status-codes";

@controller("/api/v1/points")
export class PointController extends BaseHttpController {
  constructor(
    @inject(TYPES.PointService) private readonly _pointService: PointService,
    @inject(TYPES.ClientService) private readonly _clientService: ClientService
  ) {
    super();
  }
  @httpGet("/increment/:id")
  public async getClientPoints(@requestParam("id") id: string) {
    const client = await this._clientService.getClient(id);
    if(!client) return BaseHttpResponse.error('Unregistered user',StatusCodes.NOT_FOUND) ; 
    const point = await this._pointService.increment(client);
    if(!point) return BaseHttpResponse.error('Could not update points',StatusCodes.INTERNAL_SERVER_ERROR) ; 
    return BaseHttpResponse.success('Points added successfully',StatusCodes.OK,point) ; 
  }
}

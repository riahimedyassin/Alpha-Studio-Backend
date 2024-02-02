import { inject, injectable } from "inversify";
import { PointService } from "./PointService";
import { TYPES } from "../../constants/TYPES";
import { PointRepository } from "../../repositories/point/PointRepository";
import { Point } from "../../entities/Point.entity";
import { CustomError } from "../../errors/custom-error";
import { StatusCodes } from "http-status-codes";
import { Client } from "../../entities/Client.entity";

@injectable()
export class PointServiceImpl implements PointService {
  constructor(
    @inject(TYPES.PointRepository)
    private readonly _pointRepositroy: PointRepository
  ) {}
  public async init() {
    const point = await this._pointRepositroy.save({});
    return point;
  }
  public async increment(client: Client): Promise<Point | null> {
    const point = await this._pointRepositroy.findByClient(client);
    if (point) {
      if (point?.current === 9) {
        point.current = 0;
        point.cycles += 1;
      } else {
        point.current += 1;
      }
      await point.save();
      return point;
    }
    return null;
  }

}

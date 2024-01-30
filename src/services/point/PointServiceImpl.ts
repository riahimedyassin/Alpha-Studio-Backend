import { inject, injectable } from "inversify";
import { PointService } from "./PointService";
import { TYPES } from "../../constants/TYPES";
import { PointRepository } from "../../repositories/point/PointRepository";
import { Point } from "../../entities/Point.entity";
import { CustomError } from "../../errors/custom-error";
import { StatusCodes } from "http-status-codes";

@injectable()
export class PointServiceImpl implements PointService {
  constructor(
    @inject(TYPES.PointRepository)
    private readonly _pointRepositroy: PointRepository
  ) {}
  public async init() {
    const point = await this._pointRepositroy.repos.save({});
    return point;
  }
  public async increment(id: number): Promise<Point |void> {
    const point = await this._pointRepositroy.repos.findOneBy({ id: id });
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
    
  }
}

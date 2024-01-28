import { inject, injectable } from "inversify";
import { PointService } from "./PointService";
import { TYPES } from "../../constants/TYPES";
import { PointRepository } from "../../repositories/point/PointRepository";

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
}

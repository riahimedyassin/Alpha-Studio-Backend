import { inject, injectable } from "inversify";
import { PointRepository } from "./PointRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Point } from "../../entities/Point.entity";
import { Repository } from "typeorm";

@injectable()
export class PointRepositoryImpl implements PointRepository {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  public get repos(): Repository<Point> {
    return this._dbService.db.getRepository(Point);
  }
}

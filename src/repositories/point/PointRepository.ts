import { Repository } from "typeorm";
import { Point } from "../../entities/Point.entity";

export interface PointRepository {
  get repos(): Repository<Point>;
}

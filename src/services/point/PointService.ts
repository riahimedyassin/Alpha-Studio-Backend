import { Point } from "../../entities/Point.entity";

export interface PointService {
  init(): Promise<Point>;
}

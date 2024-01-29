import { Point } from "../../entities/Point.entity";

export interface PointService {
  init(): Promise<Point>;
  increment(id: number): Promise<Point | void>;
}

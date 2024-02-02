import { Repository } from "typeorm";
import { Point } from "../../entities/Point.entity";
import { Client } from "../../entities/Client.entity";

export interface PointRepository {
  repos: Repository<Point>;
  findByID(id: number): Promise<Point | null>;
  save(point: Partial<Point>): Promise<Point>;
  findByClient(client : Client) : Promise<Point | null>

}

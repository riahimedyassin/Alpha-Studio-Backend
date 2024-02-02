import { inject, injectable } from "inversify";
import { PointRepository } from "./PointRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Point } from "../../entities/Point.entity";
import { Repository } from "typeorm";
import { Client } from "../../entities/Client.entity";

@injectable()
export class PointRepositoryImpl implements PointRepository {
  public repos: Repository<Point>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(Point);
  }
  public async findByID(id: number): Promise<Point | null> {
    const point = this.repos.findOneBy({ id: id });
    return point;
  }
  public async save(point: Partial<Point>): Promise<Point> {
    const res = await this.repos.save(point);
    return res;
  }
  public async findByClient(client: Client): Promise<Point | null> {
      const point = await this.repos.findOneBy({client:client});
      return point ; 
  }
}

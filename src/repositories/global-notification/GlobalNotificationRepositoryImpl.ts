import { inject } from "inversify";
import { GlobalNotificationRepository } from "./GlobalNotificationRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { DeleteResult, Repository } from "typeorm";
import { GlobalNotification } from "../../entities/GlobalNotification.entity";

export class GlobalNotificationRepositoryImpl
  implements GlobalNotificationRepository
{
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  get repos(): Repository<GlobalNotification> {
    return this._dbService.db.getRepository(GlobalNotification);
  }
  public async findOneAndDelete(id: string) {
    return (
      (await this.repos.delete({ id: Number(id) })) instanceof DeleteResult
    );
  }
  public async findOneByID(id: string): Promise<GlobalNotification | null> {
    return this.repos.findOneBy({ id: Number(id) });
  }
  public async find(): Promise<GlobalNotification[]> {
    return this.repos.find();
  }
}

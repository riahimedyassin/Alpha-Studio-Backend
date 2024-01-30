import { inject, injectable } from "inversify";
import { NotificationRepository } from "./NotificationRepository";
import { Notification } from "../../entities/Notification.entity";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";

@injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  get repos(): Repository<Notification> {
    return this._dbService.db.getRepository(Notification);
  }
  public async findByClientID(): Promise<Notification[]> {
        const notifications = await this.repos.findBy({})
  }
}

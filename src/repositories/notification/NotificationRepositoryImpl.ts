import { inject, injectable } from "inversify";
import { NotificationRepository } from "./NotificationRepository";
import { Notification } from "../../entities/Notification.entity";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository, UpdateResult } from "typeorm";
import { Client } from "../../entities/Client.entity";
import { NotificationPatchDTO } from "../../dto/notifications/NotificationPatch.dto";

@injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  public repos!: Repository<Notification>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this._dbService.db
      .initialize()
      .then((cnx) => (this.repos = cnx.getRepository(Notification)));
  }
  public async findByClient(client: Client): Promise<Notification[]> {
    const notifications = await this.repos.findBy({ client: client });
    return notifications;
  }
  public async findOneAndUpdate(
    id: string,
    changes: NotificationPatchDTO
  ): Promise<boolean> {
    const notification = await this.repos.update(
      { id: Number(id) },
      { read: changes.read ,}
    );
    return notification instanceof UpdateResult
  }
}

import { Repository } from "typeorm";
import { Notification } from "../../entities/Notification.entity";
import { Client } from "../../entities/Client.entity";
import { NotificationPatchDTO } from "../../dto/notifications/NotificationPatch.dto";

export interface NotificationRepository {
  repos: Repository<Notification>;
  findByClient(client: Client): Promise<Notification[]>;
  findOneAndUpdate(
    id: string,
    changes: NotificationPatchDTO
  ): Promise<boolean>;
}

import { Repository } from "typeorm";
import { Notification } from "../../entities/Notification.entity";

export interface NotificationRepository {
  get repos(): Repository<Notification>;
  // findByClientID(): Promise<Notification[]>;
}

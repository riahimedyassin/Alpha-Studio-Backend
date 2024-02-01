import { NotificationPatchDTO } from "../../dto/notifications/NotificationPatch.dto";
import { Client } from "../../entities/Client.entity";
import { Notification } from "../../entities/Notification.entity";

export interface NotificationService {
  getClientNotifications(client: Client): Promise<Notification[]>;
  updateNotification(id : string , changes : NotificationPatchDTO) : Promise<boolean> 
}

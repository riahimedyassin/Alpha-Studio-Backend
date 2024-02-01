import { inject, injectable } from "inversify";
import { Notification } from "../../entities/Notification.entity";
import { NotificationService } from "./NotificationService";
import { TYPES } from "../../constants/TYPES";
import { NotificationRepository } from "../../repositories/notification/NotificationRepository";
import { Client } from "../../entities/Client.entity";
import { NotificationPatchDTO } from "../../dto/notifications/NotificationPatch.dto";

@injectable()
export class NotificationServiceImpl implements NotificationService {
  constructor(
    @inject(TYPES.NotificationRepository)
    private readonly _notificationRepository: NotificationRepository
  ) {}
  public async getClientNotifications(client: Client): Promise<Notification[]> {
    const notifications = await this._notificationRepository.findByClient(
      client
    );
    return notifications;
  }
  public async updateNotification(
    id: string,
    changes: NotificationPatchDTO
  ): Promise<boolean> {
    return await this._notificationRepository.findOneAndUpdate(id, changes);
  }
}

import { inject, injectable } from "inversify";
import { Notification } from "../../entities/Notification.entity";
import { NotificationService } from "./NotificationService";
import { TYPES } from "../../constants/TYPES";
import { NotificationRepository } from "../../repositories/notification/NotificationRepository";


@injectable()
export class NotificationServiceImpl implements NotificationService {
    constructor(@inject(TYPES.NotificationRepository) private readonly _notificationRepository : NotificationRepository){}
    public async getClientNotifications(id : string): Promise<Notification[]> {
        
    }
}

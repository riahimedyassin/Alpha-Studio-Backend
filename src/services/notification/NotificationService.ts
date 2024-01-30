import { Notification } from "../../entities/Notification.entity";

export interface NotificationService {
    getClientNotifications() : Promise<Notification[]>
}
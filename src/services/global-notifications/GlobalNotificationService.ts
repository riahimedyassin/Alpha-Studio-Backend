import { GlobalNotification } from "../../entities/GlobalNotification.entity";

export interface GlobalNotificationService {
  getAllNotifications(): Promise<GlobalNotification[]>;
  getSingleNotification(id: string) : Promise<GlobalNotification | null> ; 
  delete(id: string ) : Promise<boolean>
}

import { Repository } from "typeorm";
import { GlobalNotification } from "../../entities/GlobalNotification.entity";

export interface GlobalNotificationRepository {
    get repos() : Repository<GlobalNotification> ; 
    findOneAndDelete(id : string ) : Promise<boolean> ; 
    findOneByID(id : string) : Promise<GlobalNotification | null>
    find() : Promise<GlobalNotification[]>
}
import { Repository } from "typeorm";
import { GlobalNotification } from "../../entities/GlobalNotification.entity";
import { GNotificationCreateDTO } from "../../dto/global-notifications/GNotificationCreate.dto";

export interface GlobalNotificationRepository {
    repos : Repository<GlobalNotification> ; 
    findOneAndDelete(id : string ) : Promise<boolean> ; 
    findOneByID(id : string) : Promise<GlobalNotification | null>
    find() : Promise<GlobalNotification[]> ; 
    save(body : GNotificationCreateDTO) : Promise<GlobalNotification | null > 
}
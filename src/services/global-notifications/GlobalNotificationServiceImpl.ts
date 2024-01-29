import { inject } from "inversify";
import { GlobalNotificationService } from "./GlobalNotificationService";
import { TYPES } from "../../constants/TYPES";
import { GlobalNotificationRepository } from "../../repositories/global-notification/GlobalNotificationRepository";
import { GlobalNotification } from "../../entities/GlobalNotification.entity";

export class GlobalNotificationServiceImpl
  implements GlobalNotificationService
{
  constructor(
    @inject(TYPES.GlobalNotificationService)
    private readonly _globalNotificationRepository: GlobalNotificationRepository
  ) {}
  public async delete(id: string): Promise<boolean> {
    return await this._globalNotificationRepository.findOneAndDelete(id);
  }
  public async getAllNotifications(): Promise<GlobalNotification[]> {
    return await this._globalNotificationRepository.find()
  }
  public async getSingleNotification(id: string): Promise<GlobalNotification | null> {
    return await this._globalNotificationRepository.findOneByID(id);
  }
}

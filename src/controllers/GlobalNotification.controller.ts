import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { GlobalNotificationService } from "../services/global-notifications/GlobalNotificationService";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

@controller("/api/v1/gnotification")
export class GlobalNotificationController extends BaseHttpController {
  constructor(
    @inject(TYPES.GlobalNotificationService)
    private readonly _globalNotificationService: GlobalNotificationService
  ) {
    super();
  }
  @httpGet("")
  public async getAllSentNotifications() {
    const notifications =
      await this._globalNotificationService.getAllNotifications();
    return BaseHttpResponse.success(
      "Global Notifications retrieved successfully",
      StatusCodes.OK,
      notifications
    );
  }
  @httpGet("/:id")
  public async getSingleNotification(@requestParam("id") id: string) {
    const notification =
      await this._globalNotificationService.getSingleNotification(id);
    if (!notification)
      return BaseHttpResponse.error(
        ReasonPhrases.NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    return BaseHttpResponse.success(
      "Notification retrieved sucessfully",
      StatusCodes.OK,
      notification
    );
  }
}

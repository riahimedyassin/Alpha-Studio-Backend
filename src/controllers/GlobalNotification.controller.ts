import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { GlobalNotificationService } from "../services/global-notifications/GlobalNotificationService";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { GNotificationCreateDTO } from "../dto/global-notifications/GNotificationCreate.dto";
import { validate } from "class-validator";
import { validationFailureHandler } from "../helpers/ValidationFailureHandler";

@controller("/api/v1/gnotifications")
export class GlobalNotificationController extends BaseHttpController {
  constructor(
    @inject(TYPES.GlobalNotificationService)
    private readonly _globalNotificationService: GlobalNotificationService
  ) {
    super();
  }
  @httpGet("/", TYPES.AuthMiddleware)
  public async getAllSentNotifications() {
    const notifications =
      await this._globalNotificationService.getAllNotifications();
    return BaseHttpResponse.success(
      "Global Notifications retrieved successfully",
      StatusCodes.OK,
      notifications
    );
  }
  @httpGet("/:id", TYPES.AuthMiddleware)
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
  @httpDelete("/:id", TYPES.AuthMiddleware, TYPES.AdminAuthMiddleware)
  public async deleteNotification(@requestParam("id") id: string) {
    const deleted = await this._globalNotificationService.delete(id);
    if (deleted)
      return BaseHttpResponse.success(
        ReasonPhrases.NO_CONTENT,
        StatusCodes.NO_CONTENT
      );
    return BaseHttpResponse.error(
      "Cannot delete the notification ",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  @httpPost("/", TYPES.AuthMiddleware, TYPES.AdminAuthMiddleware)
  public async sendNotification(@requestBody() body: GNotificationCreateDTO) {
    validationFailureHandler(await validate(body));
    const gnotification = await this._globalNotificationService.save(body);
    if (!gnotification)
      return BaseHttpResponse.error(
        "Could not send the notification",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    return BaseHttpResponse.success(
      "Saved Successfully",
      StatusCodes.OK,
      gnotification
    );
  }
}

import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { NotificationService } from "../services/notification/NotificationService";
import { ClientService } from "../services/client/ClientService";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { NotificationPatchDTO } from "../dto/notifications/NotificationPatch.dto";

@controller("/api/v1/notifications")
export class NotificationController extends BaseHttpController {
  constructor(
    @inject(TYPES.NotificationService)
    private readonly _notificationService: NotificationService,
    @inject(TYPES.ClientService)
    private readonly _clientService: ClientService
  ) {
    super();
  }
  @httpGet("/")
  public async getAllNotifications() {
    const id = this.httpContext.request.get("id");
    if (!id)
      return BaseHttpResponse.error(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    const client = await this._clientService.getClient(Number(id));
    if (!client)
      return BaseHttpResponse.error(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    const notifications =
      this._notificationService.getClientNotifications(client);
    return BaseHttpResponse.success(
      "Notifications retrieved successfully",
      StatusCodes.OK,
      notifications
    );
  }
  @httpPost("/:id")
  public async markAsReaded(@requestParam("id") id: string) {
    const updated = await this._notificationService.updateNotification(
      id,
      new NotificationPatchDTO(true)
    );
    if (!updated)
      return BaseHttpResponse.error(
        "Cannot update the notification",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    return BaseHttpResponse.success(ReasonPhrases.OK, StatusCodes.OK);
  }
}

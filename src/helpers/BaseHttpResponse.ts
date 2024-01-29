import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HttpResponseMessage, JsonContent } from "inversify-express-utils";

export class BaseHttpResponse {
  public static success(message: string, status: number, data?: any) {
    const response = new HttpResponseMessage(status);
    response.content = new JsonContent({
      message,
      status,
      data,
    });
    return response;
  }
  public static error(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    status: number = StatusCodes.INTERNAL_SERVER_ERROR
  ) {
    const response = new HttpResponseMessage(status);
    response.content = new JsonContent({
      error: message,
      status: status,
    });
  }
}

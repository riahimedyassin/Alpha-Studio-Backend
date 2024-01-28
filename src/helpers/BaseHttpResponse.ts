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
}

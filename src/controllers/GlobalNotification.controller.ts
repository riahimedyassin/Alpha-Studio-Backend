import { BaseHttpController, controller } from "inversify-express-utils";

@controller("/api/v1/gnotification")
export class GlobalNotificationController extends BaseHttpController {
  constructor() {
    super();
  }
  
}

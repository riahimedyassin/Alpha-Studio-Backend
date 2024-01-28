import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { AdminService } from "../services/admin/AdminService";
import { AdminRegisterDTO } from "../dto/admin/AdminRegister.dto";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";

@controller("/api/v1/admins")
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService
  ) {
    super();
  }
  @httpPost("")
  public async register(@requestBody() body: AdminRegisterDTO) {
    const registered = await this._adminService.register(body);
    return BaseHttpResponse.success(
      "Admin Registered successfully",
      200,
      registered
    );
  }
}

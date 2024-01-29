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
import { validate } from "class-validator";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth/AuthService";

@controller("/api/v1/admins")
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService,
    @inject(TYPES.AuthService) private readonly _authService: AuthService
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
  @httpPost("/login")
  public async login(@requestBody() body: AdminRegisterDTO) {
    await validate(body);
    const admin = await this._adminService.login(body.email, body.password);
    if (!admin)
      return BaseHttpResponse.error(
        "Invalid email or password",
        StatusCodes.BAD_REQUEST
      );
    const token = this._authService.generateToken(admin.id);
    return BaseHttpResponse.token(token);
  }
}

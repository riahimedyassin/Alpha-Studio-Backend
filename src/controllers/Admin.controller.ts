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
import { AdminService } from "../services/admin/AdminService";
import { AdminRegisterDTO } from "../dto/admin/AdminRegister.dto";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { validate } from "class-validator";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth/AuthService";
import { AdminGlobalResponse } from "../dto/admin/AdminGlobalResponse.dto";

@controller("/api/v1/admins")
export class AdminController extends BaseHttpController {
  constructor(
    @inject(TYPES.AdminService) private readonly _adminService: AdminService,
    @inject(TYPES.AuthService) private readonly _authService: AuthService
  ) {
    super();
  }
  @httpPost("/register")
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
  @httpGet("/")
  public async getAll() {
    const admins = (await this._adminService.getAll()).map(
      (admin) => new AdminGlobalResponse(admin.sup, admin.email, admin.id)
    );
    return BaseHttpResponse.success(
      "Admins Retrieved successfully",
      StatusCodes.OK,
      admins
    );
  }
  @httpGet("/:id")
  public async getSingleAdmin(@requestParam("id") id: string) {
    const admin = await this._adminService.getAdmin(id);
    if (!admin)
      return BaseHttpResponse.error("Admin not found", StatusCodes.NOT_FOUND);
    return BaseHttpResponse.success(
      "Admin retreived successfully",
      StatusCodes.OK,
      admin
    );
  }
  @httpDelete("/:id")
  public async deleteAdmin(@requestParam("id") id: string) {
    const delted = await this._adminService.delete(id);
    if (!delted)
      return BaseHttpResponse.error(
        "Cannot delete the Admin",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    return BaseHttpResponse.success(
      ReasonPhrases.NO_CONTENT,
      StatusCodes.NO_CONTENT
    );
  }

}

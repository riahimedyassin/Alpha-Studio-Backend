import "reflect-metadata";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPatch,
  httpPost,
  requestBody,
  requestParam,
} from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { ClientService } from "../services/client/ClientService";
import { ClientGlobalResponseDTO } from "../dto/client/ClientGlobalResponse.dto";
import { BaseHttpResponse } from "../helpers/BaseHttpResponse";
import { CustomError } from "../errors/custom-error";
import { ClientRegisterDTO } from "../dto/client/ClientRegister.dto";
import { validate } from "class-validator";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ClientPatchDTO } from "../dto/client/ClientPatch.dto";
import { ClientLoginDTO } from "../dto/client/ClientLogin.dto";
import { AuthService } from "../services/auth/AuthService";
import { validationFailureHandler } from "../helpers/ValidationFailureHandler";

@controller("/api/v1/clients")
export class ClientController extends BaseHttpController {
  constructor(
    @inject(TYPES.ClientService) private readonly _clientService: ClientService,
    @inject(TYPES.AuthService) private readonly _authService: AuthService
  ) {
    super();
  }
  @httpGet("/",TYPES.AuthMiddleware,TYPES.AdminAuthMiddleware)
  public async getAllClients() {
    const clients = (await this._clientService.getAll()).map(
      (client) =>
        new ClientGlobalResponseDTO(
          client.first_name,
          client.last_name,
          client.email,
          client.created_at,
          client.point
        )
    );
    return BaseHttpResponse.success(
      "Clients retrieved successfully",
      200,
      clients
    );
  }

  @httpPost("/register")
  public async register(@requestBody() body: ClientRegisterDTO) {
    const errors = await validate(body);
    validationFailureHandler(errors);
    const saved = await this._clientService.register(body);
    return BaseHttpResponse.success(
      "Client Registered successfully",
      201,
      saved
    );
  }
  @httpPost("/login")
  public async login(@requestBody() body: ClientLoginDTO) {
    await validate(body);
    const client = await this._clientService.login(body.email, body.password);
    if (!client)
      return BaseHttpResponse.error(
        "Invalid email or password",
        StatusCodes.BAD_REQUEST
      );
    const token = this._authService.generateToken(client.id);
    return BaseHttpResponse.token(token);
  }
  @httpGet("/me")
  public async getConnectedUser() {
    const id = this.httpContext.request.get("id");
    if (!id)
      return BaseHttpResponse.error(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    const user = await this._clientService.getClient(id);
    if (!user)
      return BaseHttpResponse.error(
        ReasonPhrases.UNAUTHORIZED,
        StatusCodes.UNAUTHORIZED
      );
    return BaseHttpResponse.success(
      "Client retrieved successfully",
      StatusCodes.OK,
      new ClientGlobalResponseDTO(
        user.first_name,
        user.last_name,
        user.email,
        user.created_at,
        user.point
      )
    );
  }
  @httpGet("/:id")
  public async getClient(@requestParam("id") id: string) {
    if (!id)
      BaseHttpResponse.error(
        "Please provide a valide ID",
        StatusCodes.BAD_REQUEST
      );
    const client = await this._clientService.getClient(id);
    if (!client)
      return BaseHttpResponse.error(
        `Cannot find a client with ID : ${id}`,
        StatusCodes.NOT_FOUND
      );
    return BaseHttpResponse.success(
      "Client retrieved successfully",
      StatusCodes.OK,
      client
    );
  }
  @httpDelete("/:id")
  public async delete(@requestParam("id") id: string) {
    const res = await this._clientService.delete(id);
    if (!res)
      return BaseHttpResponse.error(
        "Cannot delete the client",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    return BaseHttpResponse.success(
      ReasonPhrases.NO_CONTENT,
      StatusCodes.NO_CONTENT
    );
  }
  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    @requestBody() body: Partial<ClientPatchDTO>
  ) {
    await validate(body);
    const changed = await this._clientService.update(id, body);
    return BaseHttpResponse.success(
      "Client updated successfully",
      StatusCodes.ACCEPTED,
      changed
    );
  }
}

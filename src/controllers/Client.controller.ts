import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
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

@controller("/api/v1/clients")
export class ClientController extends BaseHttpController {
  constructor(
    @inject(TYPES.ClientService) private _clientService: ClientService
  ) {
    super();
  }
  @httpGet("/")
  public async getAllClients() {
    const clients = (await this._clientService.getAll()).map(
      (client) =>
        new ClientGlobalResponseDTO(
          client.first_name,
          client.last_name,
          client.email,
          client.created_at
        )
    );
    return BaseHttpResponse.success(
      "Clients retrieved successfully",
      200,
      clients
    );
  }
  @httpGet("/:id")
  public async getClient(@requestParam("id") id: number) {
    if (!id) CustomError.throw("Please provide a valide ID", 400);
    const client = this._clientService.getClient(id);
    if (client)
      return BaseHttpResponse.success(
        "Client retrieved successfully",
        200,
        client
      );
    CustomError.throw(`Cannot find a client with ID : ${id}`, 404);
  }
  @httpPost("")
  public async register(@requestBody() body: ClientRegisterDTO) {
    await validate(body);
    const saved = await this._clientService.register(body);
    return BaseHttpResponse.success(
      "Client Registered successfully",
      201,
      saved
    );
  }
}

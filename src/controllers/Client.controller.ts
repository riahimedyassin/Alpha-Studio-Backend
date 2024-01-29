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

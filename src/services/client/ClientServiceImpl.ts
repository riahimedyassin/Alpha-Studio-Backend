import { inject, injectable } from "inversify";
import { ClientService } from "./ClientService";
import { ClientGlobalResponseDTO } from "../../dto/client/ClientGlobalResponse.dto";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../db/DatabaseService";
import { ClientRepository } from "../../repositories/client/ClientRepository";
import { Client } from "../../models/Client.model";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { PointService } from "../point/PointService";

@injectable()
export class ClientServiceImpl implements ClientService {
  constructor(
    @inject(TYPES.ClientRepository) private _clientRepos: ClientRepository,
    @inject(TYPES.PointService) private _pointService: PointService
  ) {}
  public async getAll(): Promise<Client[]> {
    const clients = await this._clientRepos.repos.find();
    return clients;
  }
  public async getClient(id: number): Promise<Client | null> {
    const client = await this._clientRepos.repos.findOneBy({ id: id });
    return client;
  }
  public async register(client: ClientRegisterDTO): Promise<Client> {
    const point = await this._pointService.init();
    client.setPoint = point;
    const result = await this._clientRepos.repos.save(client);
    return result;
  }
}

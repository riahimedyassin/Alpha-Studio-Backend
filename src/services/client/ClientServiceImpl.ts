import { inject, injectable } from "inversify";
import { ClientService } from "./ClientService";
import { TYPES } from "../../constants/TYPES";
import { ClientRepository } from "../../repositories/client/ClientRepository";
import { Client } from "../../entities/Client.entity";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { PointService } from "../point/PointService";
import { DeleteResult } from "typeorm";
import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";

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
    client.point = point;
    const result = await this._clientRepos.repos.save(client);
    return result;
  }
  public async delete(id: string) {
    const deleted = await this._clientRepos.repos.delete({ id: Number(id) });
    return deleted instanceof DeleteResult;
  }
  public async update(
    id: string,
    changes: Partial<ClientPatchDTO>
  ): Promise<Client> {
    const changed = await this._clientRepos.findOneAndUpdate(id, changes);
    return changed;
  }
  public async login(email: string, password: string): Promise<Client | null> {
    const client = await this._clientRepos.repos.findOneBy({ email, password });
    return client;
  }
}

import { inject, injectable } from "inversify";
import { ClientService } from "./ClientService";
import { TYPES } from "../../constants/TYPES";
import { ClientRepository } from "../../repositories/client/ClientRepository";
import { Client } from "../../entities/Client.entity";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { PointService } from "../point/PointService";
import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";
import { QRCodeService } from "../qr-code/QRCodeService";

@injectable()
export class ClientServiceImpl implements ClientService {
  constructor(
    @inject(TYPES.ClientRepository) private _clientRepos: ClientRepository,
    @inject(TYPES.PointService) private _pointService: PointService,
    @inject(TYPES.QRCodeService) private _qrCodeService: QRCodeService
  ) {}
  public async getAll(): Promise<Client[]> {
    const clients = await this._clientRepos.repos.find({
      relations: ["point"],
    });
    return clients;
  }
  public async getClient(id: string): Promise<Client | null> {
    const client = await this._clientRepos.findOneByID(id);
    return client;
  }
  public async register(client: ClientRegisterDTO): Promise<Client | null> {
    const point = await this._pointService.init();
    client.point = point;
    const result = await this._clientRepos.save(client);
    if (result)
      result.qr_code = await this._qrCodeService.init(result?.id.toString());
    return result;
  }
  public async delete(id: string): Promise<boolean> {
    const deleted = await this._clientRepos.findOneAndDelete(id);
    return deleted;
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

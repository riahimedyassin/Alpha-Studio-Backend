import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Client } from "../../entities/Client.entity";
import { Repository } from "typeorm";
import { ClientRepository } from "./ClientRepository";
import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";

@injectable()
export class ClientRepositoryImpl implements ClientRepository {
  public repos: Repository<Client>;
  constructor(
    @inject(TYPES.DatabaseService) private _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(Client);
  }
  public async findOneByID(id: string): Promise<Client | null> {
    return await this.repos.findOneBy({ id: Number(id) });
  }
  public async findOneAndUpdate(
    id: string,
    changes: Partial<ClientPatchDTO>
  ): Promise<Client> {
    await this.repos.update({ id: Number(id) }, changes);
    const user = await this.findOneByID(id);
    return <Client>user;
  }
}

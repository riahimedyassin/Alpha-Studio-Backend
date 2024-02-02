import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Client } from "../../entities/Client.entity";
import { DeleteResult, Repository } from "typeorm";
import { ClientRepository } from "./ClientRepository";
import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";

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
  public async save(client: ClientRegisterDTO): Promise<Client | null> {
    const saved = await this.repos.save(client);
    return saved;
  }
  public async findOneAndDelete(id: string): Promise<boolean> {
    const deleted = await this.repos.delete({ id: Number(id) });
    return deleted instanceof DeleteResult;
  }
}

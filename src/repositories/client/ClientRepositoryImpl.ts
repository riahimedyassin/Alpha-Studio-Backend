import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Client } from "../../entities/Client.entity";
import { Repository } from "typeorm";
import { ClientRepository } from "./ClientRepository";

@injectable()
export class ClientRepositoryImpl implements ClientRepository {
  public readonly repos!: Repository<Client>;
  constructor(
    @inject(TYPES.DatabaseService) private _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(Client);
  }
}

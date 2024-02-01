import { inject, injectable } from "inversify";
import { AdminRepository } from "./AdminRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";
import { Admin } from "../../entities/Admin.entity";

@injectable()
export class AdminRepositoryImpl implements AdminRepository {
  public repos!: Repository<Admin>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this._dbService.db
      .initialize()
      .then((cnx) => (this.repos = cnx.getRepository(Admin)));
  }

  public async findOneByID(id: string): Promise<Admin | null> {
    return await this.repos.findOneBy({ id: Number(id) });
  }
}

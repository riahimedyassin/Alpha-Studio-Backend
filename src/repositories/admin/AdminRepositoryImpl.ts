import { inject, injectable } from "inversify";
import { AdminRepository } from "./AdminRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";
import { Admin } from "../../entities/Admin.entity";

@injectable()
export class AdminRepositoryImpl implements AdminRepository {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  get repos(): Repository<Admin> {
    const repos = this._dbService.db.getRepository(Admin);
    return repos;
  }
}

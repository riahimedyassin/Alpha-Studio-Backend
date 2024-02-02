import { inject, injectable } from "inversify";
import { AdminRepository } from "./AdminRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { DeleteResult, Repository } from "typeorm";
import { Admin } from "../../entities/Admin.entity";

@injectable()
export class AdminRepositoryImpl implements AdminRepository {
  public repos: Repository<Admin>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(Admin);
  }

  public async findOneByID(id: string): Promise<Admin | null> {
    return await this.repos.findOneBy({ id: Number(id) });
  }
  public async find(): Promise<Admin[]> {
    const admins = await this.repos.find();
    return admins;
  }
  public async findOneAndDelete(id: string): Promise<boolean> {
    const deleted = await this.repos.delete({ id: Number(id) });
    return deleted instanceof DeleteResult;
  }
}

import { Repository } from "typeorm";
import { Admin } from "../../entities/Admin.entity";

export interface AdminRepository {
  repos: Repository<Admin>;
  findOneByID(id: string): Promise<Admin | null>;
  find() : Promise<Admin[]> ; 
  findOneAndDelete(id : string) : Promise<boolean>
}

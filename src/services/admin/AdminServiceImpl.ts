import { inject, injectable } from "inversify";
import { AdminService } from "./AdminService";
import { TYPES } from "../../constants/TYPES";
import { AdminRepository } from "../../repositories/admin/AdminRepository";
import { AdminRegisterDTO } from "../../dto/admin/AdminRegister.dto";
import { Admin } from "../../models/Admin.model";

@injectable()
export class AdminServiceImpl implements AdminService {
  constructor(
    @inject(TYPES.AdminRepository)
    private readonly _adminRepository: AdminRepository
  ) {}
  public async register(admin: AdminRegisterDTO): Promise<Admin> {
    const saved = await this._adminRepository.repos.save(admin);
    return saved;
  }
  public async delete(id: string): Promise<boolean> {
    const saved = await this._adminRepository.findOneAndDelete(id)
    return saved ; 
  }
  public async login(email: string, password: string): Promise<Admin | null> {
    const admin = this._adminRepository.repos.findOneBy({ email, password });
    return admin;
  }
  public async getAll(): Promise<Admin[]> {
    const admins = await this._adminRepository.find();
    return admins;
  }
  public async getAdmin(id: string): Promise<Admin | null> {
    const admin = await this._adminRepository.findOneByID(id);
    return admin;
  }
}

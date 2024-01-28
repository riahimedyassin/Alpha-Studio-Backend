import { inject } from "inversify";
import { AdminService } from "./AdminService";
import { TYPES } from "../../constants/TYPES";
import { AdminRepository } from "../../repositories/admin/AdminRepository";
import { AdminRegisterDTO } from "../../dto/admin/AdminRegister.dto";
import { Admin } from "../../models/Admin.model";

export class AdminServiceImpl implements AdminService {
  constructor(
    @inject(TYPES.AdminRepository)
    private readonly _adminRepository: AdminRepository
  ) {}
  public async register(admin: AdminRegisterDTO): Promise<Admin> {
    const saved = await this._adminRepository.repos.save(admin);
    return saved;
  }
}

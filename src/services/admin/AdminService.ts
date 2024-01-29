import { AdminRegisterDTO } from "../../dto/admin/AdminRegister.dto";
import { Admin } from "../../models/Admin.model";

export interface AdminService {
  register(admin: AdminRegisterDTO): Promise<Admin>;
  delete(id: number): Promise<void>;
}

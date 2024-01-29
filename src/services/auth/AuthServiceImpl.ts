import { inject, injectable } from "inversify";
import { AuthService } from "./AuthService";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { TYPES } from "../../constants/TYPES";
import { ClientRepository } from "../../repositories/client/ClientRepository";
import { AdminRepository } from "../../repositories/admin/AdminRepository";

const { SECRET_AUTH_TOKEN } = process.env;

@injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    @inject(TYPES.ClientRepository)
    private readonly _clientRepository: ClientRepository,
    @inject(TYPES.AdminRepository)
    private readonly _adminRepository: AdminRepository
  ) {}
  public generateToken(id: number): string {
    return jwt.sign({ id: id }, SECRET_AUTH_TOKEN!, {
      expiresIn: "3d",
    });
  }
  public verifyToken(token: string): number {
    const { id } = <JwtPayload>jwt.verify(token, SECRET_AUTH_TOKEN!);
    return id;
  }
  public async existEntity(
    id: string,
    entity: "Admin" | "Client"
  ): Promise<boolean> {
    if (entity === "Admin") {
      return (await this._adminRepository.findOneByID(id)) != null;
    }
    return (await this._clientRepository.findOneByID(id)) != null;
  }
}

import { injectable } from "inversify";
import { AuthService } from "./AuthService";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const { SECRET_AUTH_TOKEN } = process.env;

@injectable()
export class AuthServiceImpl implements AuthService {
  constructor() {}
  public generateToken(id: number): string {
    return jwt.sign({ id: id }, SECRET_AUTH_TOKEN!, {
      expiresIn: "3d",
    });
  }
  public verifyToken(token: string): number {
    const { id } = <JwtPayload>jwt.verify(token, SECRET_AUTH_TOKEN!);
    return id;
  }
}

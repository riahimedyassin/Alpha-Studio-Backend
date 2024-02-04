import { inject, injectable } from "inversify";
import { QRCodeRepository } from "./QRCodeRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";
import { QRCode } from "../../entities/QRCode.entity";
import { Client } from "../../entities/Client.entity";

@injectable()
export class QRCodeRepositoryImpl implements QRCodeRepository {
  public repos: Repository<QRCode>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(QRCode);
  }
  public async getCodeByClient(client: Client): Promise<QRCode | null> {
    const qr_code = await this.repos.findOneBy({ client: client });
    return qr_code;
  }
  public async create(user_id: string): Promise<QRCode> {
    const code = await this.repos.save({
      link: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${user_id}`,
    });
    return code;
  }
}

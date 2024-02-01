import { inject, injectable } from "inversify";
import { QRCodeRepository } from "./QRCodeRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";
import { QRCode } from "../../entities/QRCode.entity";

@injectable()
export class QRCodeRepositoryImpl implements QRCodeRepository {
  public repos: Repository<QRCode>;
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {
    this.repos = this._dbService.db.getRepository(QRCode);
  }
}

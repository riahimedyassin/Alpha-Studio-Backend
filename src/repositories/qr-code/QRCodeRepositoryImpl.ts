import { inject, injectable } from "inversify";
import { QRCodeRepository } from "./QRCodeRepository";
import { TYPES } from "../../constants/TYPES";
import { DatabaseService } from "../../services/db/DatabaseService";
import { Repository } from "typeorm";
import { QRCode } from "../../entities/QRCode.entity";

@injectable()
export class QRCodeRepositoryImpl implements QRCodeRepository {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  get repos(): Repository<QRCode> {
    return this._dbService.db.getRepository(QRCode);
  }
}

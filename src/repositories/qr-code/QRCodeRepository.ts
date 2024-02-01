import { Repository } from "typeorm";
import { QRCode } from "../../entities/QRCode.entity";

export interface QRCodeRepository {
  get repos(): Repository<QRCode>;
}

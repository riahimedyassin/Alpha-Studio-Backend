import { Repository } from "typeorm";
import { QRCode } from "../../entities/QRCode.entity";
import { Client } from "../../entities/Client.entity";

export interface QRCodeRepository {
  repos: Repository<QRCode>;
  getCodeByClient(client: Client): Promise<QRCode | null>;
}

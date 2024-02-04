import { QRCode } from "../../entities/QRCode.entity";

export interface QRCodeService {
  init(user_id : string): Promise<QRCode>;
}

import { inject, injectable } from "inversify";
import { QRCodeService } from "./QRCodeService";
import { QRCode } from "../../entities/QRCode.entity";
import { TYPES } from "../../constants/TYPES";
import { QRCodeRepository } from "../../repositories/qr-code/QRCodeRepository";


@injectable()
export class QRCodeServiceImpl implements QRCodeService {
    constructor(@inject(TYPES.QRCodeRepository) private readonly _qrCodeRepository : QRCodeRepository){}
    public async init(user_id : string): Promise<QRCode> {
        return await this._qrCodeRepository.create(user_id)
    }
}
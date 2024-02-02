import { Client } from "../../entities/Client.entity";
import { Point } from "../../entities/Point.entity";

export class ClientGlobalResponseDTO {
  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly created_at: Date,
    public readonly point : Point
  ) {}
}

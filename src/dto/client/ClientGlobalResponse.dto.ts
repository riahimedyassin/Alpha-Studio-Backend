import { Client } from "../../entities/Client.entity";

export class ClientGlobalResponseDTO {
  constructor(
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: string,
    public readonly created_at: Date
  ) {}
}

import { ClientGlobalResponseDTO } from "../../dto/client/ClientGlobalResponse.dto";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { Client } from "../../models/Client.model";

export interface ClientService {
  getAll(): Promise<Client[]>;
  getClient(id: number): Promise<Client | null>;
  register(client: ClientRegisterDTO): Promise<Client>;
}

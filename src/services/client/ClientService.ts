import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { Client } from "../../models/Client.model";

export interface ClientService {
  getAll(): Promise<Client[]>;
  getClient(id: number): Promise<Client | null>;
  register(client: ClientRegisterDTO): Promise<Client>;
  delete(id: string): Promise<boolean>;
  update(id: string, changes: Partial<ClientPatchDTO>): Promise<Client>;
}

import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";
import { Client } from "../../entities/Client.entity"

export interface ClientService {
  getAll(): Promise<Client[]>;
  getClient(id: number): Promise<Client | null>;
  register(client: ClientRegisterDTO): Promise<Client>;
  delete(id: string): Promise<boolean>;
  update(id: string, changes: Partial<ClientPatchDTO>): Promise<Client>;
  login(email :string , password : string ) : Promise<Client | null>
}

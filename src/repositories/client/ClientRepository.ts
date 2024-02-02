import { Repository } from "typeorm";
import { Client } from "../../entities/Client.entity";
import { ClientPatchDTO } from "../../dto/client/ClientPatch.dto";
import { ClientRegisterDTO } from "../../dto/client/ClientRegister.dto";

export interface ClientRepository {
  repos: Repository<Client>;
  findOneByID(id: string): Promise<Client | null>;
  findOneAndUpdate(id : string , changes : Partial<ClientPatchDTO>) : Promise<Client> ; 
  save(client : ClientRegisterDTO) : Promise<Client | null> ; 
  findOneAndDelete(id: string) : Promise<boolean>
}

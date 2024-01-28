import { Repository } from "typeorm";
import { Client } from "../../entities/Client.entity";

export interface ClientRepository {
  repos: Repository<Client>;
}

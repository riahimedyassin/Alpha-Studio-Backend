import { Container } from "inversify";
import { DatabaseService } from "../services/db/DatabaseService";
import { DatabaseServiceImpl } from "../services/db/DatabaseServiceImpl";
import { TYPES } from "../constants/TYPES";
import { ClientService } from "../services/client/ClientService";
import { ClientServiceImpl } from "../services/client/ClientServiceImpl";

const container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope();
container.bind<ClientService>(TYPES.ClientService).to(ClientServiceImpl).inSingletonScope()

export { container };

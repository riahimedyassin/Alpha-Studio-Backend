import { Container } from "inversify";
import { DatabaseService } from "../services/db/DatabaseService";
import { DatabaseServiceImpl } from "../services/db/DatabaseServiceImpl";
import { TYPES } from "../constants/TYPES";

const container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl);

export { container };

import { Container } from "inversify";
import { DatabaseService } from "../services/db/DatabaseService";
import { DatabaseServiceImpl } from "../services/db/DatabaseServiceImpl";
import { TYPES } from "../constants/TYPES";
import { ClientService } from "../services/client/ClientService";
import { ClientServiceImpl } from "../services/client/ClientServiceImpl";
import { ClientRepository } from "../repositories/client/ClientRepository";
import { ClientRepositoryImpl } from "../repositories/client/ClientRepositoryImpl";
import { PointService } from "../services/point/PointService";
import { PointServiceImpl } from "../services/point/PointServiceImpl";
import { PointRepository } from "../repositories/point/PointRepository";
import { PointRepositoryImpl } from "../repositories/point/PointRepositoryImpl";

const container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope();
container.bind<ClientService>(TYPES.ClientService).to(ClientServiceImpl).inSingletonScope()
container.bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepositoryImpl).inSingletonScope()
container.bind<PointService>(TYPES.PointService).to(PointServiceImpl).inSingletonScope(); 
container.bind<PointRepository>(TYPES.PointRepository).to(PointRepositoryImpl).inSingletonScope()


export { container };

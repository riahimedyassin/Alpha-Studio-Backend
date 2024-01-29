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
import { AdminService } from "../services/admin/AdminService";
import { AdminServiceImpl } from "../services/admin/AdminServiceImpl";
import { AdminRepository } from "../repositories/admin/AdminRepository";
import { AdminRepositoryImpl } from "../repositories/admin/AdminRepositoryImpl";
import { AuthService } from "../services/auth/AuthService";
import { AuthServiceImpl } from "../services/auth/AuthServiceImpl";
import { AuthMiddleware } from "../middlewares/Auth.middleware";
import { GlobalNotificationService } from "../services/global-notifications/GlobalNotificationService";
import { GlobalNotificationServiceImpl } from "../services/global-notifications/GlobalNotificationServiceImpl";

const container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseServiceImpl).inSingletonScope();
container.bind<ClientService>(TYPES.ClientService).to(ClientServiceImpl).inSingletonScope()
container.bind<ClientRepository>(TYPES.ClientRepository).to(ClientRepositoryImpl).inSingletonScope()
container.bind<PointService>(TYPES.PointService).to(PointServiceImpl).inSingletonScope(); 
container.bind<PointRepository>(TYPES.PointRepository).to(PointRepositoryImpl).inSingletonScope()
container.bind<AdminService>(TYPES.AdminService).to(AdminServiceImpl).inSingletonScope()
container.bind<AdminRepository>(TYPES.AdminRepository).to(AdminRepositoryImpl).inSingletonScope()
container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl).inSingletonScope()
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware) ; 
container.bind<GlobalNotificationService>(TYPES.GlobalNotificationService).to(GlobalNotificationServiceImpl)



export { container };

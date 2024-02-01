import { DataSource } from "typeorm";
import { DatabaseService } from "./DatabaseService";
import { injectable } from "inversify";
import { Admin } from "../../entities/Admin.entity";
import { Client } from "../../entities/Client.entity";
import { Point } from "../../entities/Point.entity";
import { Notification } from "../../entities/Notification.entity";

@injectable()
export class DatabaseServiceImpl implements DatabaseService {
  public readonly db!: DataSource;
  public manager!: DataSource;
  constructor() {
    const { DB_HOST, DB_USERNAME, DB_DATABASE, DB_PASSWORD, DB_PORT } =
      process.env;
    const AppDataSource = new DataSource({
      type: "postgres",
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: true,
      entities: [Admin, Client, Point,Notification],
    });
    this.db = AppDataSource;
    AppDataSource.initialize().then((connection) => {
      this.manager = connection;
    });
  }
  public async connection() {
    const connection = await this.db.initialize();
    return connection;
  }
  public async check() {}
  public async connect(): Promise<void> {}
}

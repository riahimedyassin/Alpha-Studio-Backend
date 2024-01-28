import { DataSource } from "typeorm";
import { DatabaseService } from "./DatabaseService";
import { injectable } from "inversify";
import { Admin } from "../../entities/Admin.entity";
import { Client } from "../../entities/Client.entity";
import { Point } from "../../entities/Point.entity";
// import "dotenv/config";

@injectable()
export class DatabaseServiceImpl implements DatabaseService {
  public db!: DataSource;
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
      logging: true,
      entities: [Admin, Client, Point],
    });
    this.db = AppDataSource;
  }
  public async check() {}
  public async connect(): Promise<void> {}
}

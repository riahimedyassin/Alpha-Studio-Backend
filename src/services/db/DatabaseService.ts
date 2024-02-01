import { DataSource } from "typeorm";

export interface DatabaseService {
  db: DataSource;
  manager: DataSource;
  check(): Promise<void>;
  connect(): Promise<void>;
}

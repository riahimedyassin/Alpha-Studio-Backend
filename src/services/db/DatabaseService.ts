import { DataSource } from "typeorm";

export interface DatabaseService {
  db: DataSource;
  check(): Promise<void>;
  connect(): Promise<void>;
}

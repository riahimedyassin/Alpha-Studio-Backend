import { inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "./constants/TYPES";
import { DatabaseService } from "./services/db/DatabaseService";
import { Admin } from "./enteties/Admin.entity";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import express from "express";
import './controllers/Client.controller'
import 'dotenv/config'

export class Bootstrap {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  run() {
    const { PORT } = process.env || 5000;
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(express.json());
    });
    const app = server.build();
    app.listen(PORT, () => {
      console.log(`[SERVER] : Server running on port ${PORT}`);
      this._dbService.db.initialize().then(()=> {
        this._dbService.db.getRepository(Admin).insert({
            email: "yassin@gmail.com",
            password: "Mohamed",
            sup: true,
          });
      })
    });
  }
}

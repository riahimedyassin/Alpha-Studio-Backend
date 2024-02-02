import "dotenv/config";
import "reflect-metadata";
import "./controllers/Client.controller";
import "./controllers/Admin.controller";
import "./controllers/Point.controller";
import "./controllers/GlobalNotification.controller";
import "./controllers/Notification.controller";
import { inject } from "inversify";
import { TYPES } from "./constants/TYPES";
import { DatabaseService } from "./services/db/DatabaseService";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./config/inversify.config";
import express, { urlencoded } from "express";
import { ErrorHandler } from "./errors/error-handler";
import cors from "cors";

export class Bootstrap {
  constructor(
    @inject(TYPES.DatabaseService) private readonly _dbService: DatabaseService
  ) {}
  public async run() {
    await this._dbService.connectToDB();
    const { PORT } = process.env || 5000;
    const server = new InversifyExpressServer(container);
    server.setConfig((app) => {
      app.use(express.json());
      app.use(urlencoded({ extended: true }));
      app.use(
        cors({
          origin: "*",
        })
      );
    });
    server.setErrorConfig((app) => {
      app.use(ErrorHandler.handle);
    });
    const app = server.build();
    app.listen(PORT, () => {
      console.log(`[SERVER] : Server running on port ${PORT}`);
    });
  }
}

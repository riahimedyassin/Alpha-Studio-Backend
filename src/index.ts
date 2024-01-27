import "reflect-metadata";
import "dotenv/config";
import { Bootstrap } from "./bootstrap";
import { DatabaseServiceImpl } from "./services/db/DatabaseServiceImpl";
import 'dotenv/config'

export class Application extends Bootstrap {
  constructor() {
    super(new DatabaseServiceImpl());
  }
  excute() {
    this.run();
  }
}
const app = new Application();
app.excute();

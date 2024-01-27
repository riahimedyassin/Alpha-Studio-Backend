import "reflect-metadata";
import "dotenv/config";
import { Bootstrap } from "./bootstrap";
import { DatabaseServiceImpl } from "./services/db/DatabaseServiceImpl";

export class Application extends Bootstrap {
  constructor() {
    super(new DatabaseServiceImpl());
  }
  public async excute() {
    try {
      this.run();
    } catch (error: any) {
      console.error(`[ERROR] : Cannot run the server, error occured`);
      console.error(error.message);
    }
  }
}
const app = new Application();
app.excute();

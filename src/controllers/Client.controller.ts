import { inject } from "inversify";
import { BaseHttpController, controller } from "inversify-express-utils";
import { TYPES } from "../constants/TYPES";
import { ClientService } from "../services/client/ClientService";

@controller("")
export class ClientController extends BaseHttpController {
  constructor(@inject(TYPES.ClientService) private _clientService: ClientService) {
    super();
  }
}

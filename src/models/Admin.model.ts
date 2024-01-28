import { AdminGlobalResponse } from "../dto/admin/AdminGlobalResponse.dto";

export class Admin {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password: string,
    public readonly sup: boolean
  ) {}

}

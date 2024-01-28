export class AdminGlobalResponse {
  constructor(
    public readonly sup: boolean,
    public readonly email: string,
    public readonly id: number
  ) {}
}

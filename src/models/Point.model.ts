export class Point {
  constructor(
    public readonly id: number,
    public readonly current: number,
    public readonly cycles: number,
    public readonly updated_at: Date
  ) {}
}

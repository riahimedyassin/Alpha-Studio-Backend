import { IsBoolean, IsDate, IsEmail, IsString, MinLength } from "class-validator";
import { Point } from "./Point.model";

export class Client {
  public readonly id: number;
  @IsString()
  public readonly first_name: string;
  @IsString()
  public readonly last_name: string;
  @IsEmail()
  public readonly email: string;
  @MinLength(6)
  public readonly password: string;
  @IsDate()
  public readonly birthdate: Date;
  @IsBoolean()
  public readonly verified: boolean;
  @IsDate()
  public readonly created_at: Date;
  @IsDate()
  public readonly updated_at: Date;
  public readonly point: Point;
  constructor(
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birthdate: Date,
    verified: boolean,
    created_at: Date,
    updated_at: Date,
    point: Point
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.created_at = created_at;
    this.password = password;
    this.point = point;
    this.verified = verified;
    this.updated_at = updated_at;
    this.email = email;
  }
}

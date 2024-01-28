import { IsEmail, IsString, MinLength } from "class-validator";
import { Point } from "../../entities/Point.entity";

export class ClientRegisterDTO {
  @IsString({
    message: "First name should be composed of only letters",
  })
  public readonly first_name: string;
  @IsString({
    message: "Last name should be composed of only letters",
  })
  public readonly last_name: string;
  @IsEmail(undefined, {
    message: "Enter a valid email",
  })
  public readonly email: string;
  @MinLength(6, {
    message: "Password length should be longer than 6 caracters",
  })
  public readonly password: string;
  public point: Point;
  constructor(
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    point: Point
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
    this.point = point;
  }
  public set setPoint(id: Point) {
    this.point = id;
  }
}

import { IsEmail, MinLength } from "class-validator";

export class AdminRegisterDTO {
  @IsEmail(undefined, {
    message: "Enter a valid email",
  })
  public readonly email: string;
  @MinLength(6, {
    message: "Password length should be at least 6 caracters long",
  })
  public readonly password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

import { IsEmail, MinLength } from "class-validator";

export class ClientLoginDTO {
  @IsEmail(undefined, {
    message: "Please enter a valid email",
  })
  public readonly email: string;
  @MinLength(6, {
    message: "Please enter a valid password",
  })
  public readonly password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

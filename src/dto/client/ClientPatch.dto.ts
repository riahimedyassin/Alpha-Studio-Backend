import { IsEmail, IsString, MinLength } from "class-validator";

export class ClientPatchDTO {
  @IsString()
  public readonly first_name?: string;
  @IsString()
  public readonly last_name?: string;
  @IsEmail()
  public readonly email?: string;
  @MinLength(6)
  public readonly password?: string;
  constructor(
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
  ) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }
}

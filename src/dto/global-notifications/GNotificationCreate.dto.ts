import { IsString, MaxLength } from "class-validator";

export class GNotificationCreateDTO {
  @IsString()
  title!: string;
  @IsString()
  @MaxLength(200)
  content!: string;
  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
  }
}

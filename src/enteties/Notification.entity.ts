import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  content!: string;
  @Column({
    type: "boolean",
    default: false,
  })
  read!: boolean;
  @CreateDateColumn()
  sent_at!: Date;
}

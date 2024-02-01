import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./Client.entity";

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
  @ManyToOne(() => Client, (client) => client.notification)
  client!: Client;
}

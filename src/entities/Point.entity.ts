import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./Client.entity";

@Entity("Point")
export class Point extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "int",
    default: 0,
  })
  current!: number;

  @Column({
    type: "int",
    default: 0,
  })
  cycles!: number;

  @UpdateDateColumn()
  updated_at!: Date;
  @OneToOne(() => Client, (client) => client.point)
  client!: Client;
}

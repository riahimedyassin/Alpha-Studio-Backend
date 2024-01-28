import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Point } from "./Point.entity";

@Entity("Client")
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  first_name!: string;
  @Column()
  last_name!: string;
  @Column({
    unique: true,
  })
  email!: string;
  @Column()
  password!: string;
  @Column({
    type: "date",
  })
  birthdate!: Date;
  @Column({
    type: "boolean",
    default: false,
  })
  verified!: boolean;
  @CreateDateColumn()
  created_at!: Date;
  @UpdateDateColumn()
  updated_at!: Date;
  @OneToOne(() => Point, { eager: true, cascade: true })
  @JoinColumn()
  point!: Point;
}

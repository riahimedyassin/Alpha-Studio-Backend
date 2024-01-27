import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Point } from "./Point.entity";

@Entity()
export class Client {
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
  @OneToOne(() => Point)
  @JoinTable()
  point!: Point;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Point {
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
}

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";



@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column("int", {
    default: 0,
  })
  current!: number;
  @Column("int", {
    default: 0,
  })
  cycles!: number;
  @UpdateDateColumn()
  updated_at! : Date ; 
}

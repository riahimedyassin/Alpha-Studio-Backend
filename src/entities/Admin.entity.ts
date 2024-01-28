import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({
    unique: true,
  })
  email!: string;
  @Column()
  password!: string;
  @Column()
  sup!: boolean;
}

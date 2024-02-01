import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { QRCode } from "./QRCode.entity";

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
  @Column({
    default:false
  })
  sup!: boolean;
  
}

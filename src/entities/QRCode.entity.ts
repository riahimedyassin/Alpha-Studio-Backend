import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("QRCode")
export class QRCode {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  link!: string;
}

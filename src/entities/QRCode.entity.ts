import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Client } from "./Client.entity";

@Entity("QRCode")
export class QRCode {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  link!: string;
  @OneToOne(()=> Client , (client) => client.qr_code)
  client! : Client
}

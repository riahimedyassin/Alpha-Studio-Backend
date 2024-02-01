import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Point } from "./Point.entity";
import { Notification } from "./Notification.entity";
import { QRCode } from "./QRCode.entity";

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
  @OneToOne(() => Point, (point) => point.client)
  @JoinColumn({ name: "point_id" })
  point!: Point;
  @OneToMany(() => Notification, (notification) => notification.client)
  notification!: Notification[];
  @OneToOne(()=> QRCode, (qrcode) => qrcode.client)
  @JoinColumn({name:"qr_code"})
  qr_code! : QRCode 
}

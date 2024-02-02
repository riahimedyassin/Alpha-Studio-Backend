import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity('GlobalNotifications')
export class GlobalNotification {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  title!: string;
  @Column()
  content!: string;
  @CreateDateColumn()
  sent_at!: Date;
}

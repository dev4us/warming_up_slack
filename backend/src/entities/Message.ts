import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import Channel from "./Channel";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  nickname: string;

  @Column({ type: "text", nullable: false })
  contents: string;

  @ManyToOne(
    type => Channel,
    channel => channel.messages
  )
  innerChannel: Channel;

  @Column({ type: "number", nullable: false })
  innerChannelId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Message;

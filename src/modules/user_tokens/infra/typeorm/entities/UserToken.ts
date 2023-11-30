import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "../../../../user/infra/typeorm/entities/User";

@Entity("user_tokens")
class UserToken {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column("uuid")
  userId: string;

  @ManyToOne(() => User, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
  })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

export default UserToken;

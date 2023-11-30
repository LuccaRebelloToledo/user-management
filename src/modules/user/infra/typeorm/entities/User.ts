import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import UserToken from "../../../../user_tokens/infra/typeorm/entities/UserToken";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => UserToken, (userToken) => userToken.user, {
    cascade: true,
  })
  tokens: UserToken[];

  @CreateDateColumn({ type: "timestamp with time zone" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp with time zone" })
  updatedAt: Date;
}

export default User;

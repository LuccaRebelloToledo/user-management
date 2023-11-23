import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column({ type: 'varchar' })
    password: string

    @Column({type: 'varchar'})
    name: string

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;

}

export default User;
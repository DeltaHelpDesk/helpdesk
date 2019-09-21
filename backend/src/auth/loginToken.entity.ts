import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';

@Entity()
export class LoginToken {
    @PrimaryColumn()
    loginProvider: AuthType;

    @PrimaryColumn({ length: 500 })
    providerKey: string;

    @ManyToOne(type => User, user => user.assignedTasks, { eager: true })
    owner: User;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    expiration?: Date;
}
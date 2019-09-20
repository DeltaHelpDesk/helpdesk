import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';

@Entity()
export class LoginToken {
    @Column({ nullable: false })
    ownerid: number;

    @PrimaryColumn()
    loginProvider: AuthType;

    @PrimaryColumn()
    providerKey: string;

    @ManyToOne(type => User, user => user.assignedTasks, { eager: true })
    @JoinColumn({ name: 'ownerid' })
    owner: User;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    expiration?: Date;
}
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';

@Entity()
export class LoginToken {
    @Column({ nullable: false })
    ownerid: number;

    @Column()
    @PrimaryColumn()
    loginProvider: AuthType;

    @PrimaryColumn()
    @Column({ unique: true })
    providerKey: string;

    @ManyToOne(type => User, user => user.assignedTasks, { eager: true })
    @JoinColumn({ name: 'ownerid' })
    owner: User;

    @CreateDateColumn()
    created_at: Date;
}
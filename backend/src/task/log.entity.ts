import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'auth/user.entity';
import { State } from './state.enum';
import { Task } from './task.entity';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    author: User;

    @Column({ type: 'longtext', nullable: true })
    comment?: string;

    @ManyToOne(type => User, { nullable: true })
    assignee?: User;

    @Column({ nullable: true })
    state?: State;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => Task, task => task.logs)
    task: Task;

}

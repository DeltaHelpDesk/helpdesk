import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'auth/user.entity';
import { State } from './state.enum';
import { Log } from './log.entity';
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    issue: string;

    @Column()
    subject: string;

    @ManyToOne(type => User, user => user.createdTasks)
    author: User;

    @ManyToOne(type => User, user => user.assignedTasks, { nullable: true })
    assignee?: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column({default: State.UNRESOLVED})
    state: State;

    @OneToMany(type => Log, log => log.task)
    logs: Log[];
}

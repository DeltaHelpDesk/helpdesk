import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'auth/user.entity';
import { TaskState } from './taskState.enum';
import { Log } from './log.entity';
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    issue: string;

    @Column()
    subject: string;

    authorId: number;
    @ManyToOne(type => User, user => user.createdTasks, { eager: true })
    @JoinColumn({ name: 'authorId' })
    author: User;

    @ManyToOne(type => User, user => user.assignedTasks, { nullable: true, eager: true })
    assignee?: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Column({default: TaskState.UNRESOLVED})
    state: TaskState;

    @OneToMany(type => Log, log => log.task, { eager: true })
    logs: Log[];
}

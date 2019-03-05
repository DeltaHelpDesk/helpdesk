import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'auth/user.entity';
import { TaskState } from './taskState.enum';
import { Log } from './log.entity';
import { filter } from 'lodash';
@Entity()
export class Task {
    filteredKeys = ["issue", "logs"];

    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    issue: string;

    @Column()
    subject: string;

    @ManyToOne(type => User, user => user.createdTasks, { eager: true })
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

    getAnonymised() {
        return filter(this, (_, key) => !this.filteredKeys.includes(key));
    }
}

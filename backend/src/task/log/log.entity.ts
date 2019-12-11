import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../auth/user.entity';
import { TaskState } from '../taskState.enum';
import { Task } from '../task.entity';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, { eager: true })
    author: User;

    @Column({ type: 'longtext', nullable: true })
    comment?: string;

    @ManyToOne(type => User, { nullable: true, eager: true })
    assignee?: User;

    @Column({ nullable: true })
    state?: TaskState;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(type => Task, task => task.logs, { onDelete: 'CASCADE' })
    task: Task;

}

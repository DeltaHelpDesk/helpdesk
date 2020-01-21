import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskState } from './taskState.enum';
import { SubTask } from './subtask/subtask.entity';
import { Comment } from './comment/comment.entity';

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('longtext')
    issue: string;

    @Column()
    subject: string;

    authorId: number;

    @Column({ default: true })
    enabled: boolean;

    @ManyToOne(type => User, user => user.createdTasks, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'authorId' })
    author: User;

    @ManyToOne(type => User, user => user.assignedTasks, { nullable: true, eager: true, onDelete: 'CASCADE' })
    assignee?: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ default: TaskState.UNRESOLVED })
    state: TaskState;

    @OneToMany(type => SubTask, subtask => subtask.task, { eager: true })
    subtasks: SubTask[];

    @OneToMany(type => Comment, x => x.task, { eager: true })
    comments: Comment[];
}

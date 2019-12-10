import { Task } from '../task.entity';
import { CreateDateColumn, ManyToOne, Column, PrimaryGeneratedColumn, Entity, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, user => user.createdComments, { eager: true, onDelete: 'CASCADE' })
    author: User;

    @Column({ nullable: false })
    message: string;

    @ManyToOne(type => Task, task => task.comments, { onDelete: 'CASCADE' })
    task: Task;

    @UpdateDateColumn()
    updated_at: Date;

    @CreateDateColumn()
    created_at: Date;
}
import { Task } from '../task.entity';
import { CreateDateColumn, ManyToOne, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class SubTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    message: string;

    @Column({ nullable: false, default: false })
    completed: boolean;

    @Column({ nullable: true })
    completed_at?: Date;

    @ManyToOne(type => Task, task => task.subtasks, { onDelete: 'CASCADE' })
    task: Task;

    @CreateDateColumn()
    created_at: Date;
}
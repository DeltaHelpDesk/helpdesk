import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { AuthType } from './authType.enum';
import { Task } from '../task/task.entity';
import { UserRole } from './userRole.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    fullName: string;

    @Column({ length: 120, unique: true })
    email: string;

    @Column({ length: 255, nullable: true })
    password?: string;

    @Column({ nullable: true })
    token?: string;

    @Column({ nullable: true })
    otherToken?: string;

    @Column()
    authType: AuthType;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Task, task => task.author)
    createdTasks: Task[];

    @OneToMany(type => Task, task => task.assignee)
    assignedTasks: Task[];

    @Column({default: UserRole.DEFAULT})
    role: UserRole;
}
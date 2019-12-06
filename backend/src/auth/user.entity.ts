import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../task/task.entity';
import { UserRole } from './userRole.enum';
import { LoginToken } from './loginToken.entity';

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

    @Column({ length: 10, nullable: true })
    className?: string;

    @Column({ length: 10, default: 'cs_CZ', nullable: false })
    language: string;

    @Column({ length: 10, nullable: true })
    theme?: string;

    token?: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(type => Task, task => task.author)
    createdTasks: Task[];

    @OneToMany(type => Task, task => task.assignee)
    assignedTasks: Task[];

    @OneToMany(type => LoginToken, token => token.owner)
    loginTokens: Promise<LoginToken[]>;

    @Column({ default: UserRole.DEFAULT })
    role: UserRole;
}
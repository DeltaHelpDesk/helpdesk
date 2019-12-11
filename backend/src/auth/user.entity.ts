import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { UserRole } from './userRole.enum';
import { LoginToken } from './loginToken.entity';
import { Task } from '../task/task.entity';
import { Comment } from '../task/comment/comment.entity';

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

    @OneToMany(type => Task, x => x.author)
    createdTasks: Task[];

    @OneToMany(type => Task, x => x.assignee)
    assignedTasks: Task[];

    @OneToMany(type => Comment, x => x.author)
    createdComments: Comment[];

    @OneToMany(type => LoginToken, token => token.owner)
    loginTokens: Promise<LoginToken[]>;

    @Column({ default: UserRole.DEFAULT })
    role: UserRole;
}
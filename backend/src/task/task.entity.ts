import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'auth/user.entity';
enum State{
    UNRESOLVED,
    SOLVING,
    SOLVED,
    RETURNED,
}
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("longtext")
    issue: string;

    @Column()
    author: User;

    @Column()
    assignee: User;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
    
    @Column()
    state: State;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AuthType } from './authType.enum';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    fullName: string;

    @Column({ length: 120, unique: true })
    email: string;

    @Column({ length: 40 })
    password?: string;

    @Column()
    token?: string;

    @Column()
    authType: AuthType;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
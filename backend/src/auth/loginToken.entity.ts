import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { AuthType } from './authType.enum';

@Entity()
export class LoginToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    loginProvider: AuthType;

    @Column({ length: 500, nullable: false })
    providerKey: string;

    @ManyToOne(type => User, user => user.assignedTasks, { eager: true })
    owner: User;

    @CreateDateColumn()
    created_at: Date;

    @Column({ nullable: true })
    expiration?: Date;

    get expired(): boolean {
        return !!this.expiration && this.expiration < new Date();
    }
}
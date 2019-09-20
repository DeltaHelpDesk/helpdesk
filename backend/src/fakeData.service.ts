import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { User } from './auth/user.entity';
import { Task } from './task/task.entity';
import { Log } from './task/log.entity';
import { AuthType } from './auth/authType.enum';
import { TaskState } from './task/taskState.enum';
import { UserRole } from './auth/userRole.enum';

@Injectable()
export class FakeDataService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) {}
    async onModuleInit() {
        // seed admin if not exists
        const defAdminExists = !!(await this.userRepository.findOne({email: 'admin@admin.cz'}));
        if (!defAdminExists) {
            this.userRepository.insert({
                fullName: 'Admin Adminový',
                email: 'admin@admin.cz',
                password: await bcrypt.hash('admin', 10),
                role: UserRole.SUPERADMIN,
            });
        }
        // seed random user if not exists
        const defUserExists = !!(await this.userRepository.findOne({email: 'user@user.cz'}));
        if (!defUserExists) {
            this.userRepository.insert({
                fullName: 'User Júzerovský',
                email: 'user@user.cz',
                password: await bcrypt.hash('user', 10),
                role: UserRole.ADMIN,
            });
        }
        // seed other if not already seeded
        if ((await this.taskRepository.count()) > 3) {
            return;
        }
        const password = await bcrypt.hash('kaktus', 10);
        const { identifiers: [user1, user2] }: {identifiers: User[]} = await this.userRepository.insert([
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                password,
            },
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                password,
            },
        ]) as any;
        const { identifiers: [task1, task2, task3, task4] }: {identifiers: Task[]} = await this.taskRepository.insert([
            {
                author: user1,
                subject: faker.commerce.product(),
                issue: faker.lorem.paragraph(2),
                assignee: user2,
            },
            {
                author: user2,
                subject: faker.commerce.product(),
                issue: faker.lorem.paragraph(2),
                assignee: user1,
            },
            {
                author: user1,
                subject: faker.commerce.product(),
                issue: faker.lorem.paragraph(2),
                assignee: user2,
                state: TaskState.SOLVING,
            },
            {
                author: user2,
                subject: faker.commerce.product(),
                issue: faker.lorem.paragraph(2),
                assignee: user1,
                state: TaskState.RETURNED,
            },
        ]) as any;
        const { identifiers: [log1, log2, log3, log4, log5] }: {identifiers: Log[]} = await this.logRepository.insert([
            {
                author: user1,
                comment: faker.lorem.paragraph(2),
                assignee: user1,
                task: task1,
            },
            {
                author: user1,
                comment: faker.lorem.paragraph(2),
                task: task1,
            },
            {
                author: user2,
                assignee: user2,
                task: task2,
            },
            {
                author: user2,
                state: TaskState.SOLVING,
                task: task3,
            },
            {
                author: user2,
                state: TaskState.SOLVING,
                task: task3,
                comment: faker.lorem.paragraph(2),
            },
        ]) as any;
    }
}

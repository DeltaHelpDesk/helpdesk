import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { User } from './auth/user.entity';
import { Task } from './task/task.entity';
import { Log } from './task/log.entity';
import { TaskState } from './task/taskState.enum';
import { UserRole } from './auth/userRole.enum';
import { SubTask } from './task/subtask/subtask.entity';

@Injectable()
export class FakeDataService implements OnModuleInit {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(SubTask)
        private readonly subTaskRepository: Repository<SubTask>,
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) { }
    async onModuleInit() {
        // seed admin if not exists
        const defAdminExists = !!(await this.userRepository.findOne({ email: 'admin@admin.cz' }));
        if (!defAdminExists) {
            this.userRepository.insert({
                fullName: 'Admin Adminový',
                email: 'admin@admin.cz',
                password: await bcrypt.hash('admin', 10),
                role: UserRole.SUPERADMIN,
            });
        }
        // seed random user if not exists
        const defUserExists = !!(await this.userRepository.findOne({ email: 'user@user.cz' }));
        if (!defUserExists) {
            this.userRepository.insert({
                fullName: 'User Júzerovský',
                email: 'user@user.cz',
                password: await bcrypt.hash('user', 10),
                role: UserRole.ADMIN,
            });
        }
        // seed other if not already seeded
        if ((await this.userRepository.count()) > 3) {
            return;
        }
        const password = await bcrypt.hash('kaktus', 10);
        const { identifiers: [user1, user2] }: { identifiers: User[] } = await this.userRepository.insert([
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

        if ((await this.taskRepository.count()) > 3) {
            return;
        }
        const tasks = await this.seedTasks(user1, user2);

        if ((await this.logRepository.count()) < 4) {
            const logs = await this.seedLogs(user1, user2, tasks);
        }
        if ((await this.subTaskRepository.count()) < 4) {
            const subTasks = await this.seedSubTasks(tasks);
        }

    }

    private async seedTasks(user1: User, user2: User) {
        const { identifiers: [task1, task2, task3, task4] }: { identifiers: Task[] } = await this.taskRepository.insert([
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
        return { task1, task2, task3 };
    }

    private async seedLogs(user1: User, user2: User, { task1, task2, task3 }) {
        const { identifiers: [log1, log2, log3, log4, log5] }: { identifiers: Log[] } = await this.logRepository.insert([
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
        return { log1, log2, log3 };
    }

    private async seedSubTasks({ task1, task2 }) {
        const { identifiers: [sub1, sub2, sub3, sub4] }: { identifiers: SubTask[] } = await this.subTaskRepository.insert([
            {
                message: 'Ověřit',
                completed: false,
                task: task1,
            },
            {
                message: 'Koupit rohlíky',
                completed: true,
                completed_at: new Date(),
                task: task1,
            },
            {
                message: faker.lorem.words(3),
                completed: false,
                task: task2,
            },
            {
                message: faker.lorem.words(3),
                completed: false,
                task: task2,
            },
        ]) as any;
        return { sub1, sub2, sub3, sub4 };
    }
}

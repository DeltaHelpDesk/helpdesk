import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
import * as bcrypt from 'bcrypt';
import { User } from 'auth/user.entity';
import { Task } from 'task/task.entity';
import { Log } from 'task/log.entity';
import { AuthType } from 'auth/authType.enum';
import { State } from 'task/state.enum';

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
        if ((await this.taskRepository.count()) > 15) {
            return;
        }
        const password = await bcrypt.hash('kaktus', 10);
        const { identifiers: [user1, user2] }: {identifiers: User[]} = await this.userRepository.insert([
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                authType: AuthType.EMAIL,
                password,
            },
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                authType: AuthType.EMAIL,
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
                state: State.SOLVING,
            },
            {
                author: user2,
                subject: faker.commerce.product(),
                issue: faker.lorem.paragraph(2),
                assignee: user1,
                state: State.RETURNED,
            },
        ]) as any;
        const { identifiers: [log1, log2, log3, log4, log5] }: {identifiers: Task[]} = await this.logRepository.insert([
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
                state: State.SOLVING,
                task: task3,
            },
            {
                author: user2,
                state: State.SOLVING,
                task: task3,
                comment: faker.lorem.paragraph(2),
            },
        ]) as any;
    }
}

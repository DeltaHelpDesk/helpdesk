import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as faker from 'faker';
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
        let user = this.userRepository.create(
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                authType: AuthType.EMAIL,
            },
        );
        user = await this.userRepository.save(user);
        let user2 = this.userRepository.create(
            {
                fullName: faker.name.findName(),
                email: faker.internet.email(),
                authType: AuthType.EMAIL,
            },
        );
        user2 = await this.userRepository.save(user);
        await this.taskRepository.insert([
            {
                author: user,
                issue: faker.lorem.paragraph(2),
                assignee: user2,
            },
            {
                author: user2,
                issue: faker.lorem.paragraph(2),
                assignee: user,
            },
            {
                author: user,
                issue: faker.lorem.paragraph(2),
                assignee: user2,
                state: State.SOLVING,
            },
            {
                author: user2,
                issue: faker.lorem.paragraph(2),
                assignee: user,
                state: State.RETURNED,
            },
        ]);
    }
}

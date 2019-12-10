import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { Log } from './log.entity';
import { TaskResolvers } from './task.resolvers';
import { User } from '../auth/user.entity';
import { SubTask } from './subtask/subtask.entity';
import { SubTaskService } from './subtask/subtask.service';
import { SubTaskResolvers } from './subtask/subtask.resolvers';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([User, Task, Log, SubTask]),
    ],
    providers: [
        TaskService,
        TaskResolvers,
        SubTaskService,
        SubTaskResolvers,
    ],
})
export class TaskModule { }
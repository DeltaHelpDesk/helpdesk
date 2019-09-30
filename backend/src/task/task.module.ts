import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { Log } from './log.entity';
import { TaskResolvers } from './task.resolvers';
import { User } from '../auth/user.entity';
@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([User, Task, Log]),
    ],
    providers: [
        TaskService,
        TaskResolvers,
    ],
})
export class TaskModule { }
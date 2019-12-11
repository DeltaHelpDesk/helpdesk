import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Task } from '../task.entity';
import { SubTask } from '../subtask/subtask.entity';
import { SubTaskService } from '../subtask/subtask.service';
import { SubTaskResolvers } from '../subtask/subtask.resolvers';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Task, SubTask]),
    ],
    providers: [
        SubTaskService,
        SubTaskResolvers,
    ],
})
export class SubtaskModule { }
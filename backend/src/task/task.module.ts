import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { TaskResolvers } from './task.resolvers';
import { User } from '../auth/user.entity';
import { Comment } from './comment/comment.entity';
import { SubtaskModule } from './subtask/subtask.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [
        AuthModule,
        SubtaskModule,
        CommentModule,
        TypeOrmModule.forFeature([User, Task, Comment]),
    ],
    providers: [
        TaskService,
        TaskResolvers,
    ],
})
export class TaskModule { }
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Task } from '../task.entity';
import { Comment } from './comment.entity';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Task, Comment]),
    ],
    providers: [
        //  SubTaskService,
        // SubTaskResolvers,
    ],
})
export class CommentModule { }
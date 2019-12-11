import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { Task } from '../task.entity';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CommentResolvers } from './comment.resolvers';
import { User } from '../../auth/user.entity';

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([Task, User, Comment]),
    ],
    providers: [
        CommentService,
        CommentResolvers,
    ],
})
export class CommentModule { }
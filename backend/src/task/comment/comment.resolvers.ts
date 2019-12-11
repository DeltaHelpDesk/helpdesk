import { UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { GqlAuthGuard } from 'auth/gqlAuth.guard';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { GqlRoleGuard } from 'auth/gqlRole.guard';
import { User } from '../../auth/user.param.decorator';
import { UserRole } from 'auth/userRole.enum';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';
import { User as UserEntity } from '../../auth/user.entity';

@UseGuards(GqlAuthGuard)
@Resolver('Comment')
export class CommentResolvers {
    constructor(private readonly commentService: CommentService) { }

    @UseGuards(GqlAuthGuard)
    @Mutation('addComment')
    async addSubTask(
        @Args('taskId')
        taskId: number,
        @Args('message')
        message: string,
        @User()
        currentUser: UserEntity,
    ): Promise<Comment | undefined> {
        if (!taskId) {
            throw new HttpException('taskId', HttpStatus.BAD_REQUEST);
        }
        return await this.commentService.addComment(message, currentUser.id, taskId);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('changeComment')
    async changeSubTask(
        @Args('commentId')
        commentId: number,
        @Args('message')
        message?: string,
    ): Promise<Comment | undefined> {
        if (!commentId) {
            throw new HttpException('commentId', HttpStatus.BAD_REQUEST);
        }
        return await this.commentService.changeComment(commentId, message);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('deleteComment')
    async deleteSubTask(
        @Args('subTaskId')
        commentId: number,
    ): Promise<boolean> {
        if (!commentId) {
            throw new HttpException('commentId', HttpStatus.BAD_REQUEST);
        }
        return await this.commentService.deleteComment(commentId);
    }
}
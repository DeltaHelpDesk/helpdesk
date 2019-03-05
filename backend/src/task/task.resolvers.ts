import { UserRole } from 'auth/userRole.enum';
import { ParseIntPipe, UseGuards, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { User } from 'auth/user.param.decorator';
import { User as UserEntity } from 'auth/user.entity';
import { TaskState } from './taskState.enum';
import { GqlAuthGuard } from 'auth/gqlAuth.guard';
import { GqlRoleGuard } from 'auth/gqlRole.guard';
import { FilterOnRoleOrUserInterceptor } from 'auth/filterOnRoleOrUser.interceptor';
@UseGuards(GqlAuthGuard)
@Resolver('Task')
export class TaskResolvers {
    constructor(private readonly taskService: TaskService) {}

    @UseInterceptors(new FilterOnRoleOrUserInterceptor<Task>(['issue', 'logs'], UserRole.ADMIN, 'author'))
    @Query('tasks')
    async getTasks() {
        return await this.taskService.findAll();
    }

    @UseInterceptors(new FilterOnRoleOrUserInterceptor<Task>(['issue', 'logs'], UserRole.ADMIN, 'author'))
    @Query('task')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Task | undefined> {
        return await this.taskService.findOneById(id);
    }

    @Mutation('addTask')
    async login(
        @Args('subject')
        subject: string,
        @Args('issue')
        issue: string,
        @Args('assigneeId')
        assigneeId: number,
        @User()
        author: UserEntity,
    ): Promise<Task> {
        if (!subject) {
            throw new HttpException('subject', HttpStatus.BAD_REQUEST);
        }
        if (!issue) {
            throw new HttpException('issue', HttpStatus.BAD_REQUEST);
        }
        return await this.taskService.addTask({author, issue, assigneeId, subject});
    }

    @Mutation('changeTaskState')
    async changeState(
        @User()
        author: UserEntity,
        @Args('taskId')
        taskId: number,
        @Args('comment')
        comment?: string,
        @Args('state')
        state?: TaskState,
        @Args('assigneeId')
        assigneeId?: number,
    ): Promise<Task> {
        if (!taskId) {
            throw new HttpException('taskId', HttpStatus.BAD_REQUEST);
        }
        return await this.taskService.changeTaskState(author, taskId, comment, state, assigneeId);
    }

    @UseGuards(new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('deleteTask')
    async deleteTask(
        @Args('taskId')
        taskId: number,
    ): Promise<boolean> {
        return await this.taskService.deleteTask(taskId);
    }

}
import { UserRole } from '../auth/userRole.enum';
import { ParseIntPipe, UseGuards, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { User } from '../auth/user.param.decorator';
import { User as UserEntity } from '../auth/user.entity';
import { TaskState } from './taskState.enum';
import { GqlAuthGuard } from '../auth/gqlAuth.guard';
import { GqlRoleGuard } from '../auth/gqlRole.guard';
import { FilterOnRoleOrUserInterceptor } from '../auth/filterOnRoleOrUser.interceptor';

@UseGuards(GqlAuthGuard)
@Resolver('Task')
export class TaskResolvers {
    constructor(private readonly taskService: TaskService) { }

    @UseInterceptors(new FilterOnRoleOrUserInterceptor<Task>(['issue'], UserRole.ADMIN, 'authorId'))
    @Query('tasks')
    async getTasks(
        @Args('onlyEnabled')
        enabledOnly?: boolean,
        @Args('lastUpdate')
        lastUpdate?: Date,
    ) {
        return await this.taskService.findAll(enabledOnly, lastUpdate);
    }

    @UseInterceptors(new FilterOnRoleOrUserInterceptor<Task>(['issue'], UserRole.ADMIN, 'authorId'))
    @Query('task')
    async findOneById(
        @Args('id', ParseIntPipe)
        id: number,
    ): Promise<Task | undefined> {
        return await this.taskService.findOneById(id);
    }

    @Mutation('addTask')
    async addTask(
        @Args('subject')
        subject: string,
        @Args('issue')
        issue: string,
        @Args('assigneeId')
        assigneeId: number,
        @User()
        author: UserEntity,
    ): Promise<Task | undefined> {
        if (!subject) {
            throw new HttpException('subject', HttpStatus.BAD_REQUEST);
        }
        if (!issue) {
            throw new HttpException('issue', HttpStatus.BAD_REQUEST);
        }
        return await this.taskService.addTask(author, issue, subject, assigneeId);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
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
        @Args('enabled')
        enabled?: boolean,
    ): Promise<Task> {
        if (!taskId) {
            throw new HttpException('taskId', HttpStatus.BAD_REQUEST);
        }
        return await this.taskService.changeTaskState(author, taskId, comment, state, assigneeId, enabled);
    }

    @Mutation('deleteTask')
    async deleteTask(
        @Args('taskId')
        taskId: number,
        @User()
        currentUser: UserEntity,
    ): Promise<boolean> {
        return await this.taskService.deleteTask(taskId, currentUser);
    }

}
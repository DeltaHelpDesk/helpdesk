import { UserRole } from 'auth/userRole.enum';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { User } from 'auth/user.param.decorator';
import { User as UserEntity } from 'auth/user.entity';
import { TaskState } from './taskState.enum';
import { GqlAuthGuard } from 'auth/gqlAuth.guard';
import { GqlRoleGuard } from 'auth/gqlRole.guard';
@UseGuards(GqlAuthGuard)
@Resolver('Task')
export class TaskResolvers {
    constructor(private readonly taskService: TaskService) {}

    @Query('tasks')
    async getTasks() {
        return await this.taskService.findAll();
    }


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
        return await this.taskService.addTask({author, issue, assigneeId, subject});
    }

    @Mutation('changeTaskState')
    async changeState(
        @User()
        author: UserEntity,
        @Args('taskId')
        stateId: number,
        @Args('comment')
        comment: string,
        @Args('state')
        state: TaskState,
        @Args('assigneeId')
        assigneeId: number,
    ): Promise<Task> {
        return await this.taskService.changeTaskState(author, stateId, comment, state, assigneeId);
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
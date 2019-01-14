import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { User } from 'auth/user.param.decorator';
import { User as UserEntity } from 'auth/user.entity';
import { State } from './state.enum';
import { GqlAuthGuard } from 'auth/gqlAuth.guard';
// @UseGuards(GqlAuthGuard) // TODO: for now
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
    ): Promise<Task> {
        return await this.taskService.findOneById(id);
    }

    @UseGuards(GqlAuthGuard)
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
    ){
        return await this.taskService.addTask({author, issue, assigneeId, subject});
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('changeTaskState')
    async changeState(
        @User()
        author: UserEntity,
        @Args('stateId')
        stateId: number,
        @Args('comment')
        comment: string,
        @Args('state')
        state: State,
        @Args('assigneeId')
        assigneeId: number,
    ){
        return await this.taskService.changeTaskState(author, stateId, comment, state, assigneeId);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation('deleteTask')
    async deleteTask(
        @Args('taskId')
        taskId: number,
    ){
        return await this.taskService.deleteTask(taskId);
    }

}
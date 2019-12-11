import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/gqlAuth.guard';
import { SubTaskService } from './subtask.service';
import { SubTask } from './subtask.entity';
import { GqlRoleGuard } from '../../auth/gqlRole.guard';
import { UserRole } from '../../auth/userRole.enum';

@UseGuards(GqlAuthGuard)
@Resolver('SubTask')
export class SubTaskResolvers {
    constructor(private readonly subService: SubTaskService) { }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('addSubTask')
    async addSubTask(
        @Args('taskId')
        taskId: number,
        @Args('message')
        message: string,
    ): Promise<SubTask | undefined> {
        if (!taskId) {
            throw new HttpException('taskId', HttpStatus.BAD_REQUEST);
        }
        return await this.subService.addSubTask(message, taskId);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('changeSubTask')
    async changeSubTask(
        @Args('subTaskId')
        subTaskId: number,
        @Args('message')
        message?: string,
        @Args('completed')
        completed?: boolean,
    ): Promise<SubTask | undefined> {
        if (!subTaskId) {
            throw new HttpException('subTaskId', HttpStatus.BAD_REQUEST);
        }
        return await this.subService.changeSubTaskState(subTaskId, message, completed);
    }

    @UseGuards(GqlAuthGuard, new GqlRoleGuard(UserRole.ADMIN))
    @Mutation('deleteSubTask')
    async deleteSubTask(
        @Args('subTaskId')
        subTaskId: number,
    ): Promise<boolean> {
        if (!subTaskId) {
            throw new HttpException('subTaskId', HttpStatus.BAD_REQUEST);
        }
        return await this.subService.deleteTask(subTaskId);
    }
}
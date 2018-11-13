import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Task } from './task.entity';
import { TaskService } from './task.service';
@Resolver('Task')
export class TaskResolver {
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
  }
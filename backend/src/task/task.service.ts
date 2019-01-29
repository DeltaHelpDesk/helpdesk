import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'auth/user.entity';
import { TaskState } from './taskState.enum';
import { Log } from './log.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Log)
        private readonly logRepository: Repository<Log>,
    ) { }

    async findOneById(id: number): Promise<Task | undefined> {
        return await this.taskRepository.findOne(id);
    }

    async findAll(): Promise<Task[]> {
        return await this.taskRepository.find();
    }

    async addTask(taskData: { author: User, issue: string, assigneeId?: number, subject?: string }): Promise<Task> {
        const assignee = await this.userRepository.findOne(taskData.assigneeId);
        const task = this.taskRepository.create({ ...taskData, assignee });
        return await this.taskRepository.save(task);
    }

    async changeTaskState(author: User, taskId: number, comment?: string, state?: TaskState, assigneeId?: number): Promise<Task> {
        let task = await this.taskRepository.findOne(taskId);
        if(!task) {
            throw new HttpException(`Task with id: ${taskId} not found`, HttpStatus.NOT_FOUND);
        }
        if(!comment && !state && !assigneeId) {
            throw new HttpException(`Haven't passed any changes for task`, HttpStatus.BAD_REQUEST);
        }
        let log = this.logRepository.create({ author, comment, task, state });
        if (state) {
            task.state = state;
        }
        if (assigneeId) {
            const assignee = await this.userRepository.findOne(assigneeId);
            if(assignee) {
                task.assignee = assignee;
                assignee.assignedTasks.push(task);
                log.assignee = assignee;
            } else {
                throw new HttpException(`Assignee for task with id: ${assigneeId} not found`, HttpStatus.NOT_FOUND);
            }
        }
        task = await this.taskRepository.save(task);
        log = await this.logRepository.save(log);
        task.logs.push(log);
        return task;
    }

    async deleteTask(taskId: number) {
        const task = await this.taskRepository.findOne(taskId);
        if (!task) {
            throw new HttpException(`Task with id: ${taskId} not found`, HttpStatus.NOT_FOUND);
        }
        await this.taskRepository.delete(taskId);
        return true;
    }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { SubTask } from './subtask.entity';
import { Defaults } from 'common/defaults';

@Injectable()
export class SubTaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(SubTask)
        private readonly subRepository: Repository<SubTask>,
    ) { }

    async addSubTask(message: string, taskId: number): Promise<SubTask | undefined> {
        if (!taskId) {
            throw new HttpException('Task id is missing', HttpStatus.BAD_REQUEST);
        }
        const task = await this.taskRepository.findOne({ id: taskId });
        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return await this.addSubTaskP(message, task);
    }

    private async addSubTaskP(message: string, task: Task): Promise<SubTask | undefined> {
        if (!message || !task) {
            return undefined;
        }

        const maxLength = Defaults.taskSubjectMaxLength;
        if (message.length > maxLength) {
            throw new HttpException(`SubTask message is longer than max length (${maxLength})`, HttpStatus.BAD_REQUEST);
        }

        const subTask = this.subRepository.create({
            message,
            task,
            completed: false,
        });
        return await this.subRepository.save(subTask);
    }

    async changeSubTaskState(subTaskId: number, message?: string, completed?: boolean): Promise<SubTask | undefined> {
        if (!subTaskId) {
            throw new HttpException('Subtask id is missing', HttpStatus.BAD_REQUEST);
        }
        const subTask = await this.subRepository.findOne({ id: subTaskId });
        if (!subTask) {
            throw new HttpException('Subtask not found', HttpStatus.NOT_FOUND);
        }
        if (message) {
            const maxLength = Defaults.taskSubjectMaxLength;
            if (message.length > maxLength) {
                throw new HttpException(`SubTask message is longer than max length (${maxLength})`, HttpStatus.BAD_REQUEST);
            }

            subTask.message = message;
        }
        if (!!completed) {
            subTask.completed = true;
            subTask.completed_at = new Date();
        } else {
            subTask.completed = false;
            subTask.completed_at = undefined;
        }
        return await this.subRepository.save(subTask);
    }

    async deleteTask(subTaskId: number): Promise<boolean> {
        const subTask = await this.subRepository.findOne(subTaskId);
        if (!subTask) {
            throw new HttpException(`SubTask with id: ${subTaskId} not found`, HttpStatus.NOT_FOUND);
        }
        await this.subRepository.delete(subTaskId);
        return true;
    }

}
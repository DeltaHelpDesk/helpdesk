import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'auth/user.entity';
import { State } from './state.enum';
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
  ) {}

  async findOneById(id: number): Promise<Task>{
    return await this.taskRepository.findOne(id);
  }
  async findAll(): Promise<Task[]>{
    return await this.taskRepository.find();
  }
  async addTask(taskData: {author: User, issue: string, assigneeId?: number, subject?: string}): Promise<Task> {
    const assignee = await this.userRepository.findOne(taskData.assigneeId);
    const task = this.taskRepository.create({...taskData, assignee});
    return await this.taskRepository.save(task);
  }
  async changeTaskState(author: User, taskId: number, comment?: string, state?: State, assigneeId?: number): Promise<Task>{
    let task = await this.taskRepository.findOne(taskId);
    if (state) {
      task.state = state;
    }
    if (assigneeId) {
      const assignee = await this.userRepository.findOne(assigneeId);
      task.assignee = assignee;
    }
    task = await this.taskRepository.save(task);
    let log = this.logRepository.create({author, comment, task});
    log = await this.logRepository.save(log);
    task.logs.push(log);
    return task;
  }
  async deleteTask(taskId: number){
    const task = await this.taskRepository.findOne(taskId);
    if (!task) {
      return false;
    }
    await this.taskRepository.delete(taskId);
    return true;
  }
}
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
  async addTask(user: User, issue: string, assigneeId?: number): Promise<Task> {
    const assignee = await this.userRepository.findOne(assigneeId);
    const task = this.taskRepository.create({issue, assignee});
    return await this.taskRepository.save(task);
  }
  async changeTaskState(author: User, taskId: number, comment: string, state: State): Promise<Task>{
    const task = await this.taskRepository.findOne(taskId);
    if (state) {
      task.state = state;
    }
    const log = this.logRepository.create({author, comment, task});
    await this.logRepository.save(log);
    return task;
  }
}

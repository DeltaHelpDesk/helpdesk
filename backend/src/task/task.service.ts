import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'auth/user.entity';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(id: number): Promise<Task>{
    return await this.taskRepository.findOne(id);
  }
  async findAll(): Promise<Task[]>{
    return await this.taskRepository.find();
  }
  async addTask(user: User, issue: string, assigneeId?: number): Promise<Task> {
    const assignee = await this.userRepository.findOne(assigneeId);
    return this.taskRepository.create({issue, assignee});
  }
}

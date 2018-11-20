import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

 async findOneById(id: number): Promise<Task>{
    return await this.taskRepository.findOne(id);
  }
  async findAll(): Promise<Task[]>{
    return await this.taskRepository.find();
  }
}

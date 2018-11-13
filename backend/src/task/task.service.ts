import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  findOneById(id: number) :Task{
    return 
  }
  findAll(): Task[]{
    return
  }
}

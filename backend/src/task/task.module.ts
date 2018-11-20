import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { Task } from './task.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TaskService],
})
export class TaskModule {}
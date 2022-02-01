import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entiry';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task])
  ],
  exports: [TaskService]
})
export class TaskModule {}

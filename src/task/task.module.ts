import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entiry';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule
  ],
  exports: [TaskService]
})
export class TaskModule {}

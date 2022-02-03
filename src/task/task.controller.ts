import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entiry';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {

  constructor(private taskService: TaskService) {}

  @Get()
  getAllTaskByBoardId(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.taskService.getAllTaskByBoardId(boardId);
  }

  @Get(':taskId')
  getTaskByBoardIdAndTaskId(@Param('boardId') boardId: string,
                            @Param('taskId') taskId: string): Promise<Task> {
    return this.taskService.getTaskByBoardIdAndTaskId(boardId, taskId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(boardId, createTaskDto)
  }

  @Put(':taskId')
  update(@Body() updateUserDto: UpdateTaskDto,
         @Param('boardId') boardId: string,
         @Param('taskId') taskId: string): Promise<Task> {
    return this.taskService.updateTask(boardId, taskId, updateUserDto)
  }


  @Delete(':taskId')
  delete(@Param('boardId') boardId: string,
         @Param('taskId') taskId: string): Promise<void> {
    return this.taskService.removeTask(boardId, taskId);
  }

}

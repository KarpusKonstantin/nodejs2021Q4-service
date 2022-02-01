import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entiry';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {

  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  async getAllTaskByBoardId (boardId: string): Promise<Task[]> {
    return this.taskRepository.find({ where: { boardId} });
  }

  async getTaskByBoardIdAndTaskId (boardId: string, taskId: string): Promise<Task> {
    return this.taskRepository.findOne({ where: { id: taskId, boardId} });
  };

  async createTask (boardId: string | null | undefined, createTaskDto: CreateTaskDto): Promise<Task> {
    const insertResult = await this.taskRepository.insert(createTaskDto);
    let task = await this.taskRepository.findOne(insertResult.identifiers[0].id);

    task.boardId = boardId;

    task = await this.taskRepository.save(task);

    return task;
  };

  async updateTask (boardId: string, taskId: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { affected } = await this.taskRepository.update({ id: taskId, boardId }, updateTaskDto);

    if (affected > 0) {
      return await this.getTaskByBoardIdAndTaskId(boardId, taskId);
    }

    throw new HttpException(`Задача с id = ${taskId} не найден.`, HttpStatus.NOT_FOUND);
  };

  async removeTask (boardId: string, taskId: string): Promise<void> {
    await this.taskRepository.delete({ id: taskId, boardId });
  };

  async deleteTasksByBorderId (boardId: string): Promise<void> {
    await this.taskRepository.delete({ boardId });
  };

  async setUserIdToNull (userId: string): Promise<void> {
    await this.taskRepository.update({ userId }, { userId: undefined});
  };

}

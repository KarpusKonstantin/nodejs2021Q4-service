import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class BoardService {


  constructor(@InjectRepository(Board) private boardsRepository: Repository<Board>,
              private taskService: TaskService) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  };

  async getBoardById(id: string): Promise<Board> {
    const result = await this.boardsRepository.findOne(id);

    if (result === undefined) {
      throw new HttpException(`Доска с id = ${id} не найден.`, HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async removeBoard(id: string): Promise<void> {
    const result = await this.boardsRepository.findOne(id);

    if (result === undefined) {
      throw new HttpException(`Доска с id = ${id} не найден.`, HttpStatus.NOT_FOUND);
    }

    await this.taskService.deleteTasksByBorderId(id);
    await this.boardsRepository.delete(id);
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const insertResult = await this.boardsRepository.insert(createBoardDto);
    const user = await this.boardsRepository.findOne(insertResult.identifiers[0].id);

    return user;
  }

  async updateBoard(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const { affected } = await this.boardsRepository.update(id, updateBoardDto);

    if (affected > 0) {
      return await this.boardsRepository.findOne(id);
    }

    throw new HttpException(`Доска с id = ${id} не найден.`, HttpStatus.NOT_FOUND);
  }
}

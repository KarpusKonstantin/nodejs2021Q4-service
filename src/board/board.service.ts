import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {


  constructor(@InjectRepository(Board) private boardsRepository: Repository<Board>) {}

  async getAllBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  };

  async getBoardById(id: string): Promise<Board> {
    return this.boardsRepository.findOne(id);
  }

  async removeBoard(id: string): Promise<void> {
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

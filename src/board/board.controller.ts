import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.entity'
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {

  constructor(private boardService: BoardService) { }

  @Get()
  getAll(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.createBoard(createBoardDto)
  }

  @Put(':id')
  update(@Body() updateBoardDto: UpdateBoardDto, @Param('id') id: string): Promise<Board> {
    return this.boardService.updateBoard(id, updateBoardDto)
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.boardService.removeBoard(id);
  }
}

import { IBoard } from '../resources/boards/board.model';

export default interface IResultToResponse{
  code: number,
  message: string | IBoard[] | IBoard
}

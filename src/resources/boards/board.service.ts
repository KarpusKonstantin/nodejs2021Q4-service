import { StatusCodes } from 'http-status-codes';

import boardsRepository from './board.memory.repository';
import { deleteTasksByBorderId } from '../tasks/task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { IBoard } from './board.model';

const getAllBoards = async (): Promise<IResultToResponse> => boardsRepository.getAllBoards();
const getBoardById =  async (id: string): Promise<IResultToResponse> => boardsRepository.getBoardById(id);
const createBoard =  (boardData: IBoard): IResultToResponse => boardsRepository.createBoard(boardData);
const updateBoard =  (id: string, boardData: IBoard): IResultToResponse =>  boardsRepository.updateBoard(id, boardData);

const deleteBoard = (id: string): IResultToResponse => {
  const result = boardsRepository.deleteBoard(id);

  deleteTasksByBorderId(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };

import { StatusCodes } from 'http-status-codes';

import boardsRepository from './board.memory.repository';
import { deleteTasksByBorderId } from '../tasks/task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { IBoard } from './board.model';

/**
 * Returns all board list
 * @returns IResultToResponse - code = http status code (type is number) and message = board list
 */
const getAllBoards = (): IResultToResponse => boardsRepository.getAllBoards();

/**
 * Returns board by ID
 * @param id - Board ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const getBoardById =  (id: string): IResultToResponse => boardsRepository.getBoardById(id);

/**
 * Create new board
 * @param boardData - board data (IBoard)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const createBoard =  (boardData: IBoard): IResultToResponse => boardsRepository.createBoard(boardData);

/**
 * Update record of board
 * @param id - board id
 * @param boardData - board data (IBoard)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const updateBoard =  (id: string, boardData: IBoard): IResultToResponse =>  boardsRepository.updateBoard(id, boardData);

/**
 * Delete record of board and delete all tasks related to this board
 * @param id - board id
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const deleteBoard = (id: string): IResultToResponse => {
  const result = boardsRepository.deleteBoard(id);

  deleteTasksByBorderId(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };

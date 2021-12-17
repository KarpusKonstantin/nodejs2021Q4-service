import { StatusCodes } from 'http-status-codes';

import boardsRepository from './board.memory.repository';
import { deleteTasksByBorderId } from '../tasks/task.memory.repository';

const getAllBoards = () => boardsRepository.getAllBoards();
const getBoardById =  (id) => boardsRepository.getBoardById(id);
const createBoard =  (boardData) => boardsRepository.createBoard(boardData);
const updateBoard =  (id, boardData) =>  boardsRepository.updateBoard(id, boardData);

const deleteBoard = (id) => {
  const result = boardsRepository.deleteBoard(id);

  deleteTasksByBorderId(id);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };

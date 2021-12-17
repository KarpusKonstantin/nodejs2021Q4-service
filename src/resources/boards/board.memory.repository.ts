import { StatusCodes } from 'http-status-codes';
import Board, { IBoard } from './board.model';
import IResultToResponse from '../../common/globalInterafaces';

const boards: IBoard[] = [];

const getAllBoards = async (): Promise<IResultToResponse> => ({code: 200, message: boards});

const getBoardById = async (id: string): Promise<IResultToResponse> => {
  const result: IBoard[] =  boards.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Person id =  ${id} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result[0]};
};

const createBoard = (boardData: IBoard): IResultToResponse => {
  try {
    const board = new Board({...boardData});
    boards.push(board.get());

    return {code: StatusCodes.CREATED, message: board.get()};

  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create board object`};
  }
};

const updateBoard = (id: string, boardData: IBoard): IResultToResponse => {
  const board = boards.filter(item => item.id === id);

  if (board.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Board id = ${id} not found in DB`};
  }

  const index = boards.indexOf(board[0]);

  boards[index].title = boardData.title;
  boards[index].columns = boardData.columns;

  return {code: StatusCodes.OK, message: Board.toResponse(boards[index])};

};

const deleteBoard = (id: string): IResultToResponse => {
  const result =  boards.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: StatusCodes.BAD_REQUEST, message: `Board id ${id} not found in DB`};
  }

  const index = boards.indexOf(result[0]);

  if (index > -1) {
    boards.splice(index, 1);

    return {code: StatusCodes.NO_CONTENT, message: `Board id ${id} was deleted successfully`};
  }

  return {code: StatusCodes.BAD_REQUEST, message: `Board id ${id} not found in DB`};
};

export default {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};

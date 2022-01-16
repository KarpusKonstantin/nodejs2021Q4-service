import { StatusCodes } from 'http-status-codes';
import Board, { IBoard } from './board.model';
import IResultToResponse from '../../common/globalInterafaces';
import { getRepository } from 'typeorm';

// const boards: IBoard[] = [];

/**
 * Returns all board list
 * @returns IResultToResponse - code = http status code (type is number) and message = board list
 */
const getAllBoards = async (): Promise<IResultToResponse> =>{
  const boards = await getRepository(Board).find();

  return {code: 200, message: boards};

};

/**
 * Returns board by ID
 * @param id - Board ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const getBoardById = async (id: string): Promise<IResultToResponse> => {
  const result = await getRepository(Board).findOne(id);

  if (result === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `Person id =  ${id} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result};
};

/**
 * Create new board
 * @param boardData - board data (IBoard)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const createBoard = async (boardData: IBoard): Promise<IResultToResponse> => {
  try {
    const insertResult = await getRepository(Board).insert(boardData);

    return {code: StatusCodes.CREATED, message: insertResult.raw[0]};

  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create board object`};
  }
};

/**
 * Update record of board
 * @param id - board id
 * @param boardData - board data (IBoard)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const updateBoard = async (id: string, boardData: IBoard): Promise<IResultToResponse> => {
  const board =  await getRepository(Board).findOne(id);

  if (board === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `Board id = ${id} not found in DB`};
  }

  const updatedBoard = await getRepository(Board).update(id, boardData);

  return {code: StatusCodes.OK, message: updatedBoard.raw[0]};

};

/**
 * Delete record of board
 * @param id - board id
 * @returns IResultToResponse - code = http status code (type is number) and message = string or IBoard
 */
const deleteBoard = async (id: string): Promise<IResultToResponse> => {
  const result =  getRepository(Board).findOne(id);

  if (result === undefined) {
    return {code: StatusCodes.BAD_REQUEST, message: `Board id ${id} not found in DB`};
  }

  await getRepository(Board).delete(id);

  return {code: StatusCodes.NO_CONTENT, message: `Board id ${id} was deleted successfully`};
};

export default {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};

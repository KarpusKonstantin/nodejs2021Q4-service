const { StatusCodes } = require('http-status-codes');
const Board = require('./board.model');

const boards = [];

const getAllBoards = async () => ({code: 200, message: boards});

const getBoardById = async id => {
  const result =  boards.filter(item => item.id === id);

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Person id =  ${id} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result[0]};
};

const createBoard = async (boardData) => {
  try {
    const board = new Board({...boardData});
    boards.push(board.get());

    return {code: StatusCodes.CREATED, message: board.get()};

  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create board object: ${e.message}`};
  }
};

const updateBoard = async (id, boardData) => {
  const board = boards.filter(item => item.id === id);

  if (board.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Board id = ${id} not found in DB`};
  }

  const index = boards.indexOf(board[0]);

  boards[index].title = boardData.title;
  boards[index].columns = boardData.columns;

  return {code: StatusCodes.OK, message: Board.toResponse(boards[index])};

};

const deleteBoard = (id) => {
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

module.exports = {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard
};

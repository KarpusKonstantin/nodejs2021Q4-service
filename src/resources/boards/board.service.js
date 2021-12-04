const { StatusCodes } = require('http-status-codes');

const boardsRepository = require('./board.memory.repository');

const getAllBoards = () => boardsRepository.getAllBoards();
const getBoardById =  (id) => boardsRepository.getBoardById(id);
const createBoard =  (boardData) => boardsRepository.createBoard(boardData);
const updateBoard =  (id, boardData) =>  boardsRepository.updateBoard(id, boardData);

const deleteBoard = (id) => {
  const result = boardsRepository.deleteBoard(id);

  // Удалять все связанные таски

  return { code: StatusCodes.OK, message: result.message }
}


module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };

import { StatusCodes } from 'http-status-codes';
import tasksRepository from './task.memory.repository';

const getAllTaskByBoardId = (boardId) => tasksRepository.getAllTaskByBoardId(boardId);
const getTaskByBoardIdAndTaskId =  (boardId, taskId) => tasksRepository.getTaskByBoardIdAndTaskId(boardId, taskId);
const createTask =  (boardId, taskData) => tasksRepository.createTask(boardId, taskData);
const updateTask =  (boardId, taskId, userData) =>  tasksRepository.updateTask(boardId, taskId, userData);

const deleteUser = (boardId, taskId) => {
  const result = tasksRepository.deleteTask(boardId, taskId);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllTaskByBoardId, getTaskByBoardIdAndTaskId, createTask, updateTask, deleteUser };

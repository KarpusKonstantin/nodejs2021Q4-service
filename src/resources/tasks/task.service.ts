import { StatusCodes } from 'http-status-codes';
import tasksRepository from './task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { ITask } from './task.model';

const getAllTaskByBoardId = (boardId: string): IResultToResponse => tasksRepository.getAllTaskByBoardId(boardId);
const getTaskByBoardIdAndTaskId = (boardId: string, taskId: string): IResultToResponse => tasksRepository.getTaskByBoardIdAndTaskId(boardId, taskId);
const createTask =  (boardId: string | null | undefined, taskData: ITask): IResultToResponse => tasksRepository.createTask(boardId, taskData);
const updateTask =  (boardId: string, taskId: string, taskData: ITask): IResultToResponse =>  tasksRepository.updateTask(boardId, taskId, taskData);

const deleteUser = (boardId: string, taskId: string): IResultToResponse => {
  const result = tasksRepository.deleteTask(boardId, taskId);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllTaskByBoardId, getTaskByBoardIdAndTaskId, createTask, updateTask, deleteUser };

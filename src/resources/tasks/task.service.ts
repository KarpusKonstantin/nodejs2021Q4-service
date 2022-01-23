import { StatusCodes } from 'http-status-codes';
import tasksRepository from './task.memory.repository';
import IResultToResponse from '../../common/globalInterafaces';
import { ITask } from './task.model';

/**
 * Returns all tasks related to board (borderId)
 * @param boardId - board ID
 * @returns IResultToResponse - code = http status code (type is number) and message = task list (ITask[])
 */
const getAllTaskByBoardId = (boardId: string): Promise<IResultToResponse> => tasksRepository.getAllTaskByBoardId(boardId);

/**
 * Returns tasks by ID and related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const getTaskByBoardIdAndTaskId = (boardId: string, taskId: string): Promise<IResultToResponse> => tasksRepository.getTaskByBoardIdAndTaskId(boardId, taskId);

/**
 * Create task related to board (borderID)
 * @param boardId - board ID
 * @param taskData - task data (ITask)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const createTask =  (boardId: string | null | undefined, taskData: ITask): Promise<IResultToResponse> => tasksRepository.createTask(boardId, taskData);

/**
 * Update task related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @param taskData - task data (ITask)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const updateTask =  (boardId: string, taskId: string, taskData: ITask): Promise<IResultToResponse> =>  tasksRepository.updateTask(boardId, taskId, taskData);

/**
 * Delete task related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string
 */
const deleteTask = async (boardId: string, taskId: string): Promise<IResultToResponse> => {
  const result = await tasksRepository.deleteTask(boardId, taskId);

  return { code: StatusCodes.OK, message: result.message }
}


export default { getAllTaskByBoardId, getTaskByBoardIdAndTaskId, createTask, updateTask, deleteUser: deleteTask };

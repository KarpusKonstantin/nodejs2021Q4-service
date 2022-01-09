import { StatusCodes } from 'http-status-codes';
import Task, { ITask } from './task.model';
import IResultToResponse from '../../common/globalInterafaces';

const tasks: ITask[] = [];

/**
 * Returns all tasks related to board (borderId)
 * @param boardId - board ID
 * @returns IResultToResponse - code = http status code (type is number) and message = task list (ITask[])
 */
const getAllTaskByBoardId = (boardId: string): IResultToResponse => {
  const result =  tasks.filter(item => item.boardId === boardId);

  return {code: 200, message: result};
}

/**
 * Returns tasks by ID and related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const getTaskByBoardIdAndTaskId = (boardId: string, taskId: string): IResultToResponse => {
  const result =  tasks.filter(item => (item.boardId === boardId) && (item.id === taskId));

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  return {code: StatusCodes.OK, message: result[0]};
};

/**
 * Create task related to board (borderID)
 * @param boardId - board ID
 * @param taskData - task data (ITask)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const createTask = (boardId: string | null | undefined, taskData: ITask): IResultToResponse => {
  try {
    const result: ITask = taskData;

    if (result.boardId === 'undefined') {
      result.boardId = undefined;
    } else {
      result.boardId = boardId;
    }

    const task = new Task({...result});
    tasks.push(task.get());

    return {code: StatusCodes.CREATED, message: task.get()};

  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create Task object`};
  }
};

/**
 * Update task related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @param taskData - task data (ITask)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const updateTask = (boardId: string, taskId: string, taskData: ITask): IResultToResponse => {
  const result =  tasks.filter(item => (item.boardId === boardId) && (item.id === taskId));

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  const index = tasks.indexOf(result[0]);

  tasks[index].title = taskData.title;
  tasks[index].order = taskData.order;
  tasks[index].description = taskData.description;
  tasks[index].userId = taskData.userId;
  tasks[index].boardId = taskData.boardId;
  tasks[index].columnId = taskData.columnId;

  return {code: StatusCodes.OK, message: Task.toResponse(tasks[index])};

};

/**
 * Delete task related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string
 */
const deleteTask = (boardId: string, taskId: string): IResultToResponse => {
  const result =  tasks.filter(item => (item.boardId === boardId) && (item.id === taskId));

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  const index = tasks.indexOf(result[0]);

  if (index > -1) {
    tasks.splice(index, 1);

    return {code: StatusCodes.NO_CONTENT, message: `Task id ${taskId} was deleted successfully`};
  }

  return {code: StatusCodes.BAD_REQUEST, message: `Task id ${taskId} not found in DB`};
};

/**
 * Delete all tasks if board was deleted
 * @param boardId - board ID
 */
export const deleteTasksByBorderId = (boardId: string): void => {
  for( let i = 0; i < tasks.length; i += 1){

    if (tasks[i].boardId === boardId) {
      tasks.splice(i, 1);
      i -= 1;
    }
  }
}

/**
 * UserId set to null if UserId was deleted
 * @param userId - user ID
 */
export const setUserIdToNull = (userId: string) => {
  try {
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].userId === userId) {
        tasks[i].userId = null;
      }
    }

  } catch (e) {
    // console.error(e);
  }
};

export default {
  getAllTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask,
  setUserIdToNull,
  deleteTasksByBorderId
};

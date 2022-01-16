import { StatusCodes } from 'http-status-codes';
import { getRepository } from 'typeorm';
import Task, { ITask } from './task.model';
import IResultToResponse from '../../common/globalInterafaces';


/**
 * Returns all tasks related to board (borderId)
 * @param boardId - board ID
 * @returns IResultToResponse - code = http status code (type is number) and message = task list (ITask[])
 */
const getAllTaskByBoardId = async (boardId: string): Promise<IResultToResponse> => {
  const result = await getRepository(Task).find({ where: { boardId} });

  return {code: 200, message: result};
}

/**
 * Returns tasks by ID and related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const getTaskByBoardIdAndTaskId = async (boardId: string, taskId: string): Promise<IResultToResponse> => {
  const result = await getRepository(Task).findOne({ where: { id: taskId, boardId} });

  if (result === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  return {code: StatusCodes.OK, message: result};
};

/**
 * Create task related to board (borderID)
 * @param boardId - board ID
 * @param taskData - task data (ITask)
 * @returns IResultToResponse - code = http status code (type is number) and message = string or ITask
 */
const createTask = async (boardId: string | null | undefined, taskData: ITask): Promise<IResultToResponse> => {
  try {
    const result: ITask = taskData;

    if (result.boardId === 'undefined') {
      result.boardId = undefined;
    } else {
      result.boardId = boardId;
    }

    const insertResult = await getRepository(Task).insert(result);
    const user = await getRepository(Task).findOne(insertResult.identifiers[0].id);

    if (user !== undefined) {
      return { code: StatusCodes.CREATED, message: user };
    }

    return {code: StatusCodes.BAD_REQUEST, message: `Error create Task object`};

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
const updateTask = async (boardId: string, taskId: string, taskData: ITask): Promise<IResultToResponse> => {
  const result = await getRepository(Task).find({ where: { id: taskId, boardId} });

  if (result === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  await getRepository(Task).update({ id: taskId, boardId}, taskData);
  const usr = await getRepository(Task).find({ where: { id: taskId, boardId} });

  if (usr !== undefined) {
    return { code: StatusCodes.OK, message: usr };
  }

  return {code: StatusCodes.BAD_REQUEST, message: `Error update Task object`};

};

/**
 * Delete task related to board (borderID)
 * @param boardId - board ID
 * @param taskId - task ID
 * @returns IResultToResponse - code = http status code (type is number) and message = string
 */
const deleteTask = async (boardId: string, taskId: string): Promise<IResultToResponse> => {
  const result = await getRepository(Task).find({ where: { id: taskId, boardId} });

  if (result === undefined) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};
  }

  await getRepository(Task).delete({ id: taskId, boardId});

  return {code: StatusCodes.NO_CONTENT, message: `Task id ${taskId} was deleted successfully`};
};

/**
 * Delete all tasks if board was deleted
 * @param boardId - board ID
 */
export const deleteTasksByBorderId = async (boardId: string): Promise<void> => {
  await getRepository(Task).delete({ boardId });
}

/**
 * UserId set to null if UserId was deleted
 * @param userId - user ID
 */
export const setUserIdToNull = async (userId: string) => {
  try {
    await getRepository(Task).update({ userId }, { userId: null});

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

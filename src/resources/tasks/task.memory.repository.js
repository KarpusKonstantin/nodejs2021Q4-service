const { StatusCodes } = require('http-status-codes');
const Task = require('./task.model');

const tasks = [];

const getAllTaskByBoardId = async (boardId) => {
  const result =  tasks.filter(item => item.boardId === boardId);

  return {code: 200, message: result};
}

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const result =  tasks.filter(item => (item.boardId === boardId) && (item.id === taskId));

  if (result.length === 0) {
    return {code: StatusCodes.NOT_FOUND, message: `Task id, boardId =  ${taskId},${boardId} not found in DB`};

  }

  return {code: StatusCodes.OK, message: result[0]};
};

const createTask = async (boardId, taskData) => {
  try {
    const result = taskData;
    result.boardId = boardId;

    const task = new Task({...result});
    tasks.push(task.get());

    return {code: StatusCodes.CREATED, message: task.get()};

  } catch (e) {
    return {code: StatusCodes.BAD_REQUEST, message: `Error create Task object: ${e.message}`};
  }
};

const updateTask = async (boardId, taskId, taskData) => {
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

const deleteTask = (boardId, taskId) => {
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

module.exports = {
  getAllTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTask,
  updateTask,
  deleteTask
};

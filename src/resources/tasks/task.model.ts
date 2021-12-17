import { v4 as uuidv4 } from 'uuid';

export interface ITask {
  id: string;
  title: string;
  order: string;
  description: string;
  userId: string | null;
  boardId: string | null | undefined;
  columnId: string | null;
}

/**
 * Model Task which implement interface ITask
 */
class Task implements ITask{
  boardId: string | null | undefined;
  columnId: string | null;
  description: string;
  id: string;
  order: string;
  title: string;
  userId: string | null;

  constructor({
    id = uuidv4(),
    title = 'Default Title',
    order = '',
    description = 'Default Description',
    userId = null,
    boardId = null,
    columnId = null
  } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Return instance
   * @returns ITask
   */
  get(): ITask {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId
    };
  }

  /**
   * Static method which return task object
   * @param task - board data (IBoard)
   * @returns ITask
   */
  static toResponse(task: ITask): ITask {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

export default Task;

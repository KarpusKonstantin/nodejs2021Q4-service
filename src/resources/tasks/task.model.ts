import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string | null | undefined;
  columnId: string | null;
}

/**
 * Model Task which implement interface ITask
 */

@Entity('task')
class Task implements ITask{
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  boardId: string | null | undefined;

  @Column({ type: 'varchar', nullable: true })
  columnId: string | null;

  @Column()
  description: string;

  @Column({ type: 'int', default: 0})
  order: number;

  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  userId: string | null;

  constructor({
    id = uuidv4(),
    title = 'Default Title',
    order = 0,
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

import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import Task from '../tasks/task.model';

export interface IBoard {
  id: string,
  title: string,
  columns: string
}


/**
 * Model board which implement interface IBoard
 */

@Entity('board')
class Board implements IBoard{
  @PrimaryColumn()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column( 'json', {nullable: true })
  columns: string;

  @Column()
  title: string;

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];

  constructor({
    id = uuidv4(),
    title = 'Default',
    columns = ''
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Return instance
   * @returns IBoard
   */
  get(): IBoard {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns,
    }
  }

  /**
   * Static method which return board object
   * @param board - board data (IBoard)
   * @returns IBoard
   */
  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;

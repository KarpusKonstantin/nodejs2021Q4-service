import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import ColumnBoard from '../columns/column.model';

export interface IBoard {
  id: string,
  title: string,
  columns: ColumnBoard[]
}


/**
 * Model board which implement interface IBoard
 */

@Entity('board')
class Board implements IBoard{
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  columns: ColumnBoard[];

  @Column()
  title: string;

  constructor({
    id = uuidv4(),
    title = 'Default',
    columns = [new ColumnBoard()]
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

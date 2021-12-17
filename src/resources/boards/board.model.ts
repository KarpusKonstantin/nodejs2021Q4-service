import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

export interface IBoard {
  id: string,
  title: string,
  columns: Column[]
}


/**
 * Model board which implement interface IBoard
 */
class Board implements IBoard{
  columns: Column[];
  id: string;
  title: string;

  constructor({
    id = uuidv4(),
    title = 'Default',
    columns = [new Column()]
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

import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

export interface IBoard {
  id: string,
  title: string,
  columns: Column[]
}


class Board implements IBoard{
  constructor({
    id = uuidv4(),
    title = 'Default',
    columns = [new Column()]
  } = {} as IBoard) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  get(): IBoard {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns,
    }
  }

  static toResponse(board: IBoard): IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }

  columns: Column[];
  id: string;
  title: string;
}

export default Board;

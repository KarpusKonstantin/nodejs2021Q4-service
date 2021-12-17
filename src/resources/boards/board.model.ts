import { v4 as uuidv4 } from 'uuid';
import Column from '../columns/column.model';

export interface IBoard {
  id: string,
  title: string,
  columns: string
}


class Board {
  title: string;
  id: string;
  columns: Column[];

  constructor({
    id = uuidv4(),
    title = 'Default',
    columns = [new Column()]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      columns: this.columns,
    }
  }

  static toResponse(board: IBoard) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export default Board;

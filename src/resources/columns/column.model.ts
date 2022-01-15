import { v4 as uuidv4 } from 'uuid';

export interface IColumn {
  id: string,
  title: string,
  order: string
}

class ColumnBoard {
  id: string;
  title: string;
  order: string;

  constructor({ id = uuidv4(), title = '', order = '' } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  get(): IColumn {
    return {
      id: this.id,
      title: this.title,
      order: this.order
    };
  }
}

export default ColumnBoard;

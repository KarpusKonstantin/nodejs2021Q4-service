import { v4 as uuidv4 } from 'uuid';

class Column {
  constructor({ id = uuidv4(), title, order } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  get() {
    return {
      id: this.id,
      title: this.title,
      order: this.order
    };
  }
}

export default Column;

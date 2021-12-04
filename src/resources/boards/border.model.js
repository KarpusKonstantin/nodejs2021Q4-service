const { v4: uuidv4 } = require('uuid');
const Column = require('../columns/column.model');

class Border {
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

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}




module.exports = Border;

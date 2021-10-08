const BaseAdapter = require('./baseAdapter');

module.exports = class ItemAdapter extends BaseAdapter {
  constructor() {
    super({
      name: 'Item',
      model: 'Item',
    });
  }
};

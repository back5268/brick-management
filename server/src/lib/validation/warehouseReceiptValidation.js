export const listWarehouseReceiptValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  type: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true }
};

export const detailWarehouseReceiptValid = {
  _id: 'string'
};

export const createWarehouseReceiptValid = {
  type: 'string',
  warehouse: 'string',
  items: 'json',
  note: { type: 'string', allowNull: true }
};

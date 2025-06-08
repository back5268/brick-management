export const listOrderValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  customer: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true }
};

export const detailOrderValid = {
  _id: 'string'
};

export const createOrderValid = {
  customer: 'string',
  warehouse: 'string',
  items: { type: 'json' },
  palletDeposit: { type: 'number', allowNull: true },
  totalAmount: 'number',
  note: { type: 'string', allowNull: true }
};

export const exportOrderValid = {
  keySearch: { type: 'string', allowNull: true },
  customer: { type: 'string', allowNull: true },
  account: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  fromDate: { type: 'date', allowNull: true },
  toDate: { type: 'date', allowNull: true }
};

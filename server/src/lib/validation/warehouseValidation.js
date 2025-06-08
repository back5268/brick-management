export const listWarehouseValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailWarehouseValid = {
  _id: 'string'
};

export const updateWarehouseValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'string', allowNull: true },
  location: { type: 'string', allowNull: true },
  note: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const createWarehouseValid = {
  name: 'string',
  code: 'string',
  location: 'string',
  note: { type: 'string', allowNull: true }
};

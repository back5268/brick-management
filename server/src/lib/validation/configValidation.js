export const listCategoryValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true }
};

export const detailCategoryValid = {
  _id: 'string'
};

export const updateCategoryValid = {
  _id: 'string',
  name: { type: 'string', allowNull: true },
  code: { type: 'email', allowNull: true },
  status: { type: 'number', allowNull: true },
  description: { type: 'string', allowNull: true }
};

export const createCategoryValid = {
  name: 'string',
  code: 'string',
  description: { type: 'string', allowNull: true }
};

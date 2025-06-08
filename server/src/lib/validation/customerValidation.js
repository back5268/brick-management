export const listCustomerValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
};

export const detailCustomerValid = {
  _id: 'string'
};

export const updateCustomerValid = {
  _id: 'string',
  fullName: { type: 'string', allowNull: true },
  email: { type: 'email', allowNull: true },
  phone: { type: 'phone', allowNull: true },
  address: { type: 'string', allowNull: true },
  prices: { type: 'json', allowNull: true },
};

export const createCustomerValid = {
  fullName: 'string',
  email: 'email',
  phone: 'phone',
  address: 'string',
  prices: { type: 'json', allowNull: true },
};

export const listPriceByCustomerValid = {
  _id: 'string',
  status: { type: 'number', allowNull: true },
  page: { type: 'number', allowNull: true },
  limit: { type: 'number', allowNull: true },
};

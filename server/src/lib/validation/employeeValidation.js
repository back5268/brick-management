export const listEmployeeValid = {
  page: 'number',
  limit: 'number',
  keySearch: { type: 'string', allowNull: true },
  email: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  role: { type: 'string', allowNull: true }
};

export const detailEmployeeValid = {
  _id: 'string'
};

export const updateEmployeeValid = {
  _id: 'string',
  fullName: { type: 'string', allowNull: true },
  email: { type: 'email', allowNull: true },
  phone: { type: 'phone', allowNull: true },
  username: { type: 'string', allowNull: true },
  status: { type: 'number', allowNull: true },
  role: { type: 'string', allowNull: true }
};

export const createEmployeeValid = {
  fullName: 'string',
  email: 'email',
  phone: 'phone',
  username: 'string',
  role: 'string'
};

export const VALIDATE_TYPE = {
  EMAIL: 'email',
  STRING: 'string',
  NUMBER: 'number',
  PHONE: 'phone',
  JSON: 'json',
  ARRAY: 'array',
  BOOLEAN: 'boolean',
  DATE: 'date',
  DATETIME: 'datetime'
};

export const orderStatus = [
  { name: 'Chờ xuất', _id: 0, severity: 'warning' },
  { name: 'Chờ thanh toán', _id: 1, severity: 'info' },
  { name: 'Đã thanh toán', _id: 2, severity: 'success' },
  { name: 'Đã hủy', _id: 3, severity: 'danger' },
];

export const stackingMethods = [
  { name: 'Xếp Pallet', _id: 'pallet' },
  { name: 'Xếp lẻ', _id: 'manual' },
];

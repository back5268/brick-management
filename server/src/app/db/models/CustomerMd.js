import { ModelBase } from '@config';

export class CustomerMd extends ModelBase {}

CustomerMd.init('Customer', {
  fullName: { type: String, required: true },
  email: String,
  phone: String,
  address: String,
  deletedAt: Date
});

export const listCustomerMd = (where, page, limit, populates, attr, sort) => {
  return CustomerMd.find({ where, page, limit, populates, attr, sort });
};

export const countCustomerMd = (where) => {
  return CustomerMd.count({ where });
};

export const detailCustomerMd = (where, populates, attr) => {
  return CustomerMd.findOne({ where, populates, attr });
};

export const createCustomerMd = (attr) => {
  return CustomerMd.create({ attr });
};

export const updateCustomerMd = (where, attr) => {
  return CustomerMd.update({ where, attr });
};

export const updateManyCustomerMd = (where, attr) => {
  return CustomerMd.update({ where, attr });
};

export const deleteCustomerMd = (where) => {
  return CustomerMd.delete({ where });
};

export const aggregateCustomerMd = (aggregate) => {
  return CustomerMd.aggregate({ aggregate });
};

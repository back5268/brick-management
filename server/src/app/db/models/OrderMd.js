import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class OrderMd extends ModelBase {}

OrderMd.init('Order', {
  code: { type: String, required: true, unique: true },
  customer: { type: ObjectId, ref: 'Customer', required: true },
  account: { type: ObjectId, ref: 'Account' },
  warehouse: String,
  status: { type: Number, enum: [0, 1, 2, 3], default: 0 },
  items: [
    {
      category: { type: String },
      categoryName: { type: String },
      quantity: Number,
      amount: Number,
      unitPrice: Number,
      totalPrice: Number,
      stackingMethod: { type: String, enum: ['pallet', 'manual'] },
      palletDeposit: { type: Number, default: 0 },
      paymentStatus: { type: Number, default: 1 },
    }
  ],
  totalAmount: Number,
  paidAmount: { type: Number, default: 0 },
  note: String,
  html: String,
  deletedAt: Date
});

export const listOrderMd = (where, page, limit, populates, attr, sort) => {
  return OrderMd.find({ where, page, limit, populates, attr, sort });
};

export const countOrderMd = (where) => {
  return OrderMd.count({ where });
};

export const detailOrderMd = (where, populates, attr) => {
  return OrderMd.findOne({ where, populates, attr });
};

export const createOrderMd = (attr) => {
  return OrderMd.create({ attr });
};

export const updateOrderMd = (where, attr) => {
  return OrderMd.update({ where, attr });
};

export const updateManyOrderMd = (where, attr) => {
  return OrderMd.update({ where, attr });
};

export const deleteOrderMd = (where) => {
  return OrderMd.delete({ where });
};

export const aggregateOrderMd = (aggregate) => {
  return OrderMd.aggregate({ aggregate });
};

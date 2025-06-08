import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class PaymentMd extends ModelBase {}

PaymentMd.init('Payment', {
  order: { type: ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paidAt: { type: Date, default: Date.now },
  deletedAt: Date
});

export const listPaymentMd = (where, page, limit, populates, attr, sort) => {
  return PaymentMd.find({ where, page, limit, populates, attr, sort });
};

export const countPaymentMd = (where) => {
  return PaymentMd.count({ where });
};

export const detailPaymentMd = (where, populates, attr) => {
  return PaymentMd.findOne({ where, populates, attr });
};

export const createPaymentMd = (attr) => {
  return PaymentMd.create({ attr });
};

export const updatePaymentMd = (where, attr) => {
  return PaymentMd.update({ where, attr });
};

export const updateManyPaymentMd = (where, attr) => {
  return PaymentMd.update({ where, attr });
};

export const deletePaymentMd = (where) => {
  return PaymentMd.delete({ where });
};

export const aggregatePaymentMd = (aggregate) => {
  return PaymentMd.aggregate({ aggregate });
};

import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class PriceMd extends ModelBase {}

PriceMd.init('Price', {
  account: { type: ObjectId, required: true, ref: 'Account' },
  category: { type: ObjectId, required: true, ref: 'Category' },
  customer: { type: ObjectId, required: true, ref: 'Customer' },
  price: { type: Number, required: true, min: 0 },
  key: { type: String },
  description: { type: String },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  deletedAt: Date
});

export const listPriceMd = (where, page, limit, populates, attr, sort) => {
  return PriceMd.find({ where, page, limit, populates, attr, sort });
};

export const countPriceMd = (where) => {
  return PriceMd.count({ where });
};

export const detailPriceMd = (where, populates, attr) => {
  return PriceMd.findOne({ where, populates, attr });
};

export const createPriceMd = (attr) => {
  return PriceMd.create({ attr });
};

export const updatePriceMd = (where, attr) => {
  return PriceMd.update({ where, attr });
};

export const updateManyPriceMd = (where, attr) => {
  return PriceMd.update({ where, attr });
};

export const deletePriceMd = (where) => {
  return PriceMd.delete({ where });
};

export const aggregatePriceMd = (aggregate) => {
  return PriceMd.aggregate({ aggregate });
};

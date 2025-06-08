import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class StockMd extends ModelBase {}

StockMd.init('Stock', {
  category: { type: ObjectId, ref: 'Category', required: true },
  warehouse: { type: ObjectId, ref: 'Warehouse', required: true },
  amount: { type: Number, default: 0 },
  deletedAt: Date
});

export const listStockMd = (where, page, limit, populates, attr, sort) => {
  return StockMd.find({ where, page, limit, populates, attr, sort });
};

export const countStockMd = (where) => {
  return StockMd.count({ where });
};

export const detailStockMd = (where, populates, attr) => {
  return StockMd.findOne({ where, populates, attr });
};

export const createStockMd = (attr) => {
  return StockMd.create({ attr });
};

export const updateStockMd = (where, attr) => {
  return StockMd.update({ where, attr });
};

export const updateManyStockMd = (where, attr) => {
  return StockMd.update({ where, attr });
};

export const deleteStockMd = (where) => {
  return StockMd.delete({ where });
};

export const aggregateStockMd = (aggregate) => {
  return StockMd.aggregate({ aggregate });
};

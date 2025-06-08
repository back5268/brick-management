import { ModelBase } from '@config';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

export class WarehouseReceiptMd extends ModelBase {}

WarehouseReceiptMd.init('WarehouseReceipt', {
  code: { type: String, required: true, unique: true },
  type: { type: String, required: true, enum: ['import', 'export'] },
  account: { type: ObjectId, ref: 'Account' },
  order: { type: ObjectId, ref: 'Order' },
  warehouse: { type: ObjectId, ref: 'Warehouse', required: true },
  items: [
    {
      category: { type: String },
      categoryName: { type: String },
      quantity: Number,
      stackingMethod: { type: String, enum: ['pallet', 'manual'] },
      amount: Number,
    }
  ],
  note: String,
  files: [String],
  deletedAt: Date
});

export const listWarehouseReceiptMd = (where, page, limit, populates, attr, sort) => {
  return WarehouseReceiptMd.find({ where, page, limit, populates, attr, sort });
};

export const countWarehouseReceiptMd = (where) => {
  return WarehouseReceiptMd.count({ where });
};

export const detailWarehouseReceiptMd = (where, populates, attr) => {
  return WarehouseReceiptMd.findOne({ where, populates, attr });
};

export const createWarehouseReceiptMd = (attr) => {
  return WarehouseReceiptMd.create({ attr });
};

export const updateWarehouseReceiptMd = (where, attr) => {
  return WarehouseReceiptMd.update({ where, attr });
};

export const updateManyWarehouseReceiptMd = (where, attr) => {
  return WarehouseReceiptMd.update({ where, attr });
};

export const deleteWarehouseReceiptMd = (where) => {
  return WarehouseReceiptMd.delete({ where });
};

export const aggregateWarehouseReceiptMd = (aggregate) => {
  return WarehouseReceiptMd.aggregate({ aggregate });
};

import { ModelBase } from '@config';

export class WarehouseMd extends ModelBase {}

WarehouseMd.init('Warehouse', {
  name: { type: String, required: true },
  code: { type: String, required: true },
  location: String,
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  note: String,
  deletedAt: Date
});

export const listWarehouseMd = (where, page, limit, populates, attr, sort) => {
  return WarehouseMd.find({ where, page, limit, populates, attr, sort });
};

export const countWarehouseMd = (where) => {
  return WarehouseMd.count({ where });
};

export const detailWarehouseMd = (where, populates, attr) => {
  return WarehouseMd.findOne({ where, populates, attr });
};

export const createWarehouseMd = (attr) => {
  return WarehouseMd.create({ attr });
};

export const updateWarehouseMd = (where, attr) => {
  return WarehouseMd.update({ where, attr });
};

export const updateManyWarehouseMd = (where, attr) => {
  return WarehouseMd.update({ where, attr });
};

export const deleteWarehouseMd = (where) => {
  return WarehouseMd.delete({ where });
};

export const aggregateWarehouseMd = (aggregate) => {
  return WarehouseMd.aggregate({ aggregate });
};

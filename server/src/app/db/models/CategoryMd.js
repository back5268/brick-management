import { ModelBase } from '@config';

export class CategoryMd extends ModelBase {}

CategoryMd.init('Category', {
  name: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: Number, enum: [0, 1], default: 1, description: '0: Đã khóa, 1: Hoạt động' },
  description: String,
  deletedAt: Date
});

export const listCategoryMd = (where, page, limit, populates, attr, sort) => {
  return CategoryMd.find({ where, page, limit, populates, attr, sort });
};

export const countCategoryMd = (where) => {
  return CategoryMd.count({ where });
};

export const detailCategoryMd = (where, populates, attr) => {
  return CategoryMd.findOne({ where, populates, attr });
};

export const createCategoryMd = (attr) => {
  return CategoryMd.create({ attr });
};

export const updateCategoryMd = (where, attr) => {
  return CategoryMd.update({ where, attr });
};

export const updateManyCategoryMd = (where, attr) => {
  return CategoryMd.update({ where, attr });
};

export const deleteCategoryMd = (where) => {
  return CategoryMd.delete({ where });
};

export const aggregateCategoryMd = (aggregate) => {
  return CategoryMd.aggregate({ aggregate });
};

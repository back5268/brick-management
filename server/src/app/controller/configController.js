import { createCategoryValid, detailCategoryValid, listCategoryValid, updateCategoryValid } from '@lib/validation';
import { countCategoryMd, createCategoryMd, deleteCategoryMd, detailCategoryMd, listCategoryMd, updateCategoryMd } from '@models';
import { validateData } from '@utils';

export const getListCategory = async (req, res) => {
  try {
    const { error, value } = validateData(listCategoryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listCategoryMd(where, page, limit);
    const total = await countCategoryMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListCategoryInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listCategoryMd() });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { error, value } = validateData(detailCategoryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailCategoryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Danh mục không tồn tại!' });
    res.status(201).json({ status: 1, data: await deleteCategoryMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailCategory = async (req, res) => {
  try {
    const { error, value } = validateData(detailCategoryValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailCategoryMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Danh mục không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error, value } = validateData(updateCategoryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name, code } = value;
    const dataz = await detailCategoryMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Danh mục không tồn tại!' });
    if (name) {
      const checkName = await detailCategoryMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên danh mục đã được sử dụng!' });
    }
    if (code) {
      const checkCode = await detailCategoryMd({ code });
      if (checkCode) return res.json({ status: 0, mess: 'Mã danh mục đã được sử dụng!' });
    }
    const data = await updateCategoryMd({ _id }, { ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { error, value } = validateData(createCategoryValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name, code } = value;
    const checkName = await detailCategoryMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên danh mục đã được sử dụng!' });
    const checkCode = await detailCategoryMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Mã danh mục đã được sử dụng!' });
    const data = await createCategoryMd({ ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

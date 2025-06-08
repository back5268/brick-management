import { createWarehouseValid, detailWarehouseValid, listWarehouseValid, updateWarehouseValid } from '@lib/validation';
import {
  countWarehouseMd,
  createWarehouseMd,
  deleteWarehouseMd,
  detailWarehouseMd,
  listStockMd,
  listWarehouseMd,
  updateWarehouseMd
} from '@models';
import { validateData } from '@utils';

export const getListWarehouse = async (req, res) => {
  try {
    const { error, value } = validateData(listWarehouseValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }, { code: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    const documents = await listWarehouseMd(where, page, limit);
    for (const doc of documents) {
      doc.items = await listStockMd({ warehouse: doc._id }, false, false, [{ path: 'category', select: 'name code' }]);
    }
    const total = await countWarehouseMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListWarehouseInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listWarehouseMd({}) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteWarehouse = async (req, res) => {
  try {
    const { error, value } = validateData(detailWarehouseValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailWarehouseMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Kho hàng không tồn tại!' });
    res.status(201).json({ status: 1, data: await deleteWarehouseMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailWarehouse = async (req, res) => {
  try {
    const { error, value } = validateData(detailWarehouseValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailWarehouseMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Kho hàng không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateWarehouse = async (req, res) => {
  try {
    const { error, value } = validateData(updateWarehouseValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name, code } = value;
    const dataz = await detailWarehouseMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Kho hàng không tồn tại!' });
    if (name) {
      const checkName = await detailWarehouseMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên kho đã được sử dụng!' });
    }
    if (code) {
      const checkCode = await detailWarehouseMd({ code });
      if (checkCode) return res.json({ status: 0, mess: 'Mã kho đã được sử dụng!' });
    }
    const data = await updateWarehouseMd({ _id }, { ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createWarehouse = async (req, res) => {
  try {
    const { error, value } = validateData(createWarehouseValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name, code } = value;
    const checkName = await detailWarehouseMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên kho đã được sử dụng!' });
    const checkCode = await detailWarehouseMd({ code });
    if (checkCode) return res.json({ status: 0, mess: 'Mã kho đã được sử dụng!' });
    const data = await createWarehouseMd({ ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

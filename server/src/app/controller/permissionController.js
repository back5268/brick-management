import { createPermissionValid, detailPermissionValid, listPermissionValid, updatePermissionValid } from '@lib/validation';
import {
  countPermissionMd,
  createPermissionMd,
  deletePermissionMd,
  detailPermissionMd,
  listPermissionMd,
  listToolMd,
  updatePermissionMd
} from '@models';
import { validateData } from '@utils';

export const getListPermission = async (req, res) => {
  try {
    const { error, value } = validateData(listPermissionValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, status, role } = value;
    const where = {};
    if (keySearch) where.$or = [{ name: { $regex: keySearch, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (role) where.role = role;
    const documents = await listPermissionMd(where, page, limit);
    const total = await countPermissionMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListTool = async (req, res) => {
  try {
    res.json({ status: 1, data: await listToolMd({ status: 1 }, false, false, false, false, { sort: 1 }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deletePermission = async (req, res) => {
  try {
    const { error, value } = validateData(detailPermissionValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await deletePermissionMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Nhóm quyền không tồn tại!' });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailPermission = async (req, res) => {
  try {
    const { error, value } = validateData(detailPermissionValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailPermissionMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Nhóm quyền không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updatePermission = async (req, res) => {
  try {
    const { error, value } = validateData(updatePermissionValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, name } = value;
    const dataz = await detailPermissionMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Nhóm quyền không tồn tại!' });
    if (name) {
      const checkName = await detailPermissionMd({ name });
      if (checkName) return res.json({ status: 0, mess: 'Tên nhóm quyền đã tồn tại!' });
    }
    const data = await updatePermissionMd({ _id }, { updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createPermission = async (req, res) => {
  try {
    const { error, value } = validateData(createPermissionValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { name } = value;
    const checkName = await detailPermissionMd({ name });
    if (checkName) return res.json({ status: 0, mess: 'Tên nhóm quyền đã tồn tại!' });
    const data = await createPermissionMd({ updatedBy: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

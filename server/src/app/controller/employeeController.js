import bcrypt from 'bcrypt';
import { createEmployeeValid, detailEmployeeValid, listEmployeeValid, updateEmployeeValid } from '@lib/validation';
import { countAccountMd, createAccountMd, deleteAccountMd, detailAccountMd, listAccountMd, updateAccountMd } from '@models';
import { generateRandomString, validateData } from '@utils';

export const getListEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(listEmployeeValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, email, status, role } = value;
    const where = {};
    if (keySearch) where.$or = [{ fullName: { $regex: keySearch, $options: 'i' } }, { username: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    if (status || status === 0) where.status = status;
    if (role) where.role = role;
    const documents = await listAccountMd(where, page, limit);
    const total = await countAccountMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListEmployeeInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listAccountMd({}) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailAccountMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Nhân viên không tồn tại!' });
    res.status(201).json({ status: 1, data: await deleteAccountMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailAccountMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Nhân viên không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(updateEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, email, phone, username } = value;
    const dataz = await detailAccountMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Nhân viên không tồn tại!' });
    if (email) {
      const checkEmail = await detailAccountMd({ email });
      if (checkEmail) return res.json({ status: 0, mess: 'Email đã được sử dụng!' });
    }
    if (phone) {
      const checkPhone = await detailAccountMd({ phone });
      if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã được sử dụng!' });
    }
    if (username) {
      const checkUsername = await detailAccountMd({ username });
      if (checkUsername) return res.json({ status: 0, mess: 'Tài khoản đã được sử dụng!' });
    }
    const data = await updateAccountMd({ _id }, { ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { error, value } = validateData(createEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { email, phone, username } = value;
    const checkEmail = await detailAccountMd({ email });
    if (checkEmail) return res.json({ status: 0, mess: 'Email đã được sử dụng!' });
    const checkPhone = await detailAccountMd({ phone });
    if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã được sử dụng!' });
    const checkUsername = await detailAccountMd({ username });
    if (checkUsername) return res.json({ status: 0, mess: 'Tài khoản đã được sử dụng!' });
    const data = await createAccountMd({ ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { error, value } = validateData(detailEmployeeValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const newPassword = generateRandomString(8);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(newPassword, salt);
    await updateAccountMd({ _id }, { password, token: '' });
    res.status(201).json({ status: 1, data: newPassword });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

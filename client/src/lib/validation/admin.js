import { REGEX } from '@constant';
import * as yup from 'yup';

export const EmployeeValidation = yup.object({
  fullName: yup.string().required('Tên nhân viên không được bỏ trống!'),
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Số điện thoại không được bỏ trống!'),
  role: yup.string().required('Quyền không được bỏ trống!'),
});

export const CategoryValidation = yup.object({
  name: yup.string().required('Tên danh mục không được bỏ trống!'),
  code: yup.string().required('Mã danh mục không được bỏ trống!'),
});

export const CustomerValidation = yup.object({
  fullName: yup.string().required('Tên nhân viên không được bỏ trống!'),
  email: yup.string().email('Email không đúng định dạng!').required('Email không được bỏ trống!'),
  phone: yup.string().matches(REGEX.C_PHONE, 'Số điện thoại không đúng định dạng!').required('Số điện thoại không được bỏ trống!'),
  address: yup.string().required('Địa chỉ không được bỏ trống!'),
});

export const OrderValidation = yup.object({
  customer: yup.string().required('Khách hàng không được bỏ trống!'),
  warehouse: yup.string().required('Kho hàng không được bỏ trống!'),
});

export const PermissionValidation = yup.object({
  name: yup.string().required('Tên nhóm quyền không được bỏ trống!'),
  role: yup.string().required('Vai trò không được bỏ trống!'),
});

export const WarehouseValidation = yup.object({
  name: yup.string().required('Tên kho không được bỏ trống!'),
  code: yup.string().required('Mã kho không được bỏ trống!'),
  location: yup.string().required('Vị trí kho không được bỏ trống!'),
});

export const WarehouseReceiptValidation = yup.object({
  type: yup.string().required('Hình thức không được bỏ trống!'),
  warehouse: yup.string().required('Kho hàng không được bỏ trống!'),
});

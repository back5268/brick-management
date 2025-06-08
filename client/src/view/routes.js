import { Config } from './admin/config';
import { Customer, DetailCustomer } from './admin/customer';
import { DashBoard } from './admin/dashboard';
import { Employee } from './admin/employee';
import { DetailOrder, Order, Print } from './admin/order';
import { DetailPermission, Permission } from './admin/permission';
import { Warehouse } from './admin/warehouse';
import { DetailWarehouseReceipt, WarehouseReceipt } from './admin/warehouse-receipt';
import { ChangePassword, ForgotPassword, SignIn } from './auth';

export const routes = [
  { path: '/auth/sign-in', element: SignIn, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },
  { path: '/auth/change-password', element: ChangePassword },

  { path: '/', element: DashBoard, layout: true },

  { path: '/permission', element: Permission, layout: true },
  { path: '/permission/create', element: DetailPermission, layout: true },
  { path: '/permission/detail/:_id', element: DetailPermission, layout: true },

  { path: '/category', element: Config, layout: true },
  { path: '/employee', element: Employee, layout: true },
  { path: '/customer', element: Customer, layout: true },
  { path: '/customer/create', element: DetailCustomer, layout: true },
  { path: '/customer/detail/:_id', element: DetailCustomer, layout: true },

  { path: '/order', element: Order, layout: true },
  { path: '/order/create', element: DetailOrder, layout: true },
  { path: '/order/detail/:_id', element: DetailOrder, layout: true },
  { path: '/order/print/:_id', element: Print },

  { path: '/warehouse', element: Warehouse, layout: true },
  { path: '/warehouse-receipt', element: WarehouseReceipt, layout: true },
  { path: '/warehouse-receipt/create', element: DetailWarehouseReceipt, layout: true },
  { path: '/warehouse-receipt/detail/:_id', element: DetailWarehouseReceipt, layout: true }
];

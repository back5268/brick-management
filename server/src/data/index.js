export const accounts = [
  {
    fullName: 'Admin',
    email: 'admin@gmail.com',
    phone: '0976630981',
    username: 'admin',
    password: '$2a$12$RIEOMMxcRP4I5XNnzPNS9O0EtvP6rhYQ3SJ0/zyqqNBLhb14uZeC6',
    status: 1,
    role: 'admin'
  },
  {
    fullName: 'Kế toán',
    email: 'accounting@gmail.com',
    phone: '0976630982',
    username: 'accounting',
    password: '$2a$12$QisBCVgqDOgoNWnKZMx1FOGeWQXzjDuoLSiZbBOMJaZnkWzhfA8hS',
    status: 1,
    role: 'accounting'
  },
  {
    fullName: 'Nhân viên bán hàng',
    email: 'sales@gmail.com',
    phone: '0976630983',
    username: 'sales',
    password: '$2a$12$u82sDdeMrdHcTraop053DO1td00OjG4IWyG5Bh88nNkcqcL8Tg.iC',
    status: 1,
    role: 'sales'
  }
];

export const tools = [
  {
    name: 'Trang Chủ',
    icon: 'Squares2X2Icon',
    sort: 1,
    items: [
      { name: 'Dashboard', route: '/', actions: ['read'] },
      { name: 'Dashboard', route: '/dashboard', showSidebar: false, actions: ['read'] }
    ]
  },
  {
    name: 'Phân Quyền',
    icon: 'Cog6ToothIcon',
    sort: 2,
    items: [
      {
        name: 'Phân Quyền',
        route: '/permission',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Quản Lý Nhân Viên',
    icon: 'UsersIcon',
    sort: 3,
    items: [
      {
        name: 'Quản Lý Nhân Viên',
        route: '/employee',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Quản Lý Bán Hàng',
    icon: 'PresentationChartBarIcon',
    sort: 4,
    items: [
      {
        name: 'Quản Lý Loại Gạch',
        route: '/category',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản Lý Khách Hàng',
        route: '/customer',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản Lý Đơn Hàng',
        route: '/order',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Quản Lý Kho',
    icon: 'Square3Stack3DIcon',
    sort: 5,
    items: [
      {
        name: 'Quản Lý Kho',
        route: '/warehouse',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản Lý Phiếu Nhập Xuất',
        route: '/warehouse-receipt',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Quản Lý Doanh Thu',
    icon: 'CalculatorIcon',
    sort: 6,
    items: [
      {
        name: 'Quản Lý Giao Dịch',
        route: '/transaction',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Tổng Hợp Công Nợ',
        route: '/debt',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Cấu Hình',
    icon: 'AdjustmentsHorizontalIcon',
    sort: 7,
    items: [
      {
        name: 'Cấu Hình',
        route: '/config',
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  }
];

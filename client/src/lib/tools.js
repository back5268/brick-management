export const tools = [
  { name: 'Trang chủ', icon: 'Squares2X2Icon', sort: 1, route: '/' },
  {
    name: 'Quản lý nhân sự',
    icon: 'UsersIcon',
    sort: 2,
    items: [
      {
        name: 'Quản lý chức vụ',
        route: '/position'
      },
      {
        name: 'Quản lý vị trí công việc',
        route: '/job-position'
      },
      {
        name: 'Quản lý phòng ban',
        route: '/department'
      },
      {
        name: 'Thông tin nhân sự',
        route: '/personnel'
      }
    ]
  },
  {
    name: 'Quản lý chấm công',
    icon: 'Square3Stack3DIcon',
    sort: 3,
    items: [
      {
        name: 'Đăng ký chấm công',
        route: '/register'
      },
      {
        name: 'Quản lý thiết bị chấm công',
        route: '/device'
      },
      {
        name: 'Quản lý ca làm việc',
        route: '/shift'
      },
      {
        name: 'Lịch làm việc',
        route: '/schedule'
      },
      {
        name: 'Lịch sử chấm công',
        route: '/log'
      },
      {
        name: 'Tổng hợp chấm công',
        route: '/summary'
      }
    ]
  },
  {
    name: 'Quản lý tiền lương',
    icon: 'CircleStackIcon',
    sort: 4,
    items: []
  },
  {
    name: 'Quản lý phê duyệt',
    sort: 5,
    icon: 'InboxStackIcon',
    items: []
  },
  {
    name: 'Cấu hình',
    icon: 'Cog6ToothIcon',
    sort: 6,
    items: [
      {
        name: 'Phân quyền',
        route: '/permission'
      },
      {
        name: 'Thiết lập mẫu thông báo',
        route: '/template'
      },
      {
        name: 'Lịch sử gửi email',
        route: '/log'
      }
    ]
  }
];
export const toolActions = [
  { name: 'Thêm mới', _id: 'create' },
  { name: 'Xem', _id: 'read' },
  { name: 'Cập nhật', _id: 'update' },
  { name: 'Xóa', _id: 'delete' }
];

export const userPermission = [
  { name: 'Admin', _id: 'admin' },
  { name: 'Nhân viên bán hàng', _id: 'sales' },
  { name: 'Nhân viên kho', _id: 'warehouse' },
  { name: 'Kế toán', _id: 'accounting' }
];

export const orderStatus = [
  { name: 'Chờ xuất', _id: 0, severity: 'warning' },
  { name: 'Chờ thanh toán', _id: 1, severity: 'info' },
  { name: 'Đã thanh toán', _id: 2, severity: 'success' },
  { name: 'Đã hủy', _id: 3, severity: 'danger' },
];

export const stackingMethods = [
  { name: 'Xếp Pallet', _id: 'pallet' },
  { name: 'Xếp lẻ', _id: 'manual' },
];

export const paymentStatus = [
  { name: 'Đã thanh toán', _id: 1 },
  { name: 'Chưa thanh toán', _id: 2 },
];

export const warehouseReceiptTypes = [
  { name: 'Phiếu nhập', _id: 'import' },
  { name: 'Phiếu xuất', _id: 'export' },
];

export const status = [
  { name: 'Hoạt động', _id: 1 },
  { name: 'Dừng hoạt động', _id: 0 }
];

export const genders = [
  { name: 'Nam', _id: 1 },
  { name: 'Nữ', _id: 2 },
  { name: 'Khác', _id: 3 }
];

export const employeeTypes = [
  { name: 'Nhân viên chính thức', _id: 1 },
  { name: 'Nhân viên thử việc', _id: 2 },
  { name: 'Thực tập sinh', _id: 3 }
];

export const maritalStatus = [
  { name: 'Độc thân', _id: 1 },
  { name: 'Đã kết hôn', _id: 2 }
];

export const relations = [
  { name: 'Vợ/Chồng', _id: 1 },
  { name: 'Con', _id: 2 },
  { name: 'Bố/Mẹ', _id: 3 },
  { name: 'Anh/Chị/Em', _id: 4 },
  { name: 'Khác', _id: 5 }
];

export const taxAuths = [
  { name: 'Công ty', _id: 1 },
  { name: 'Cá nhân', _id: 2 }
];

export const allowanceTypes = [
  { name: 'Trợ cấp theo tháng', _id: 1 },
  { name: 'Trợ cấp theo ngày làm việc', _id: 2 }
];

export const qualifications = [
  { name: 'Trên đại học', _id: 1 },
  { name: 'Đại học', _id: 2 },
  { name: 'Cao đẳng', _id: 3 },
  { name: 'Trung cấp', _id: 4 },
  { name: 'Sơ cấp', _id: 5 },
  { name: 'Sinh viên', _id: 6 },
  { name: 'Khác', _id: 7 }
];

export const graduationTypes = [
  { name: 'Xuất sắc', _id: 1 },
  { name: 'Giỏi', _id: 2 },
  { name: 'Khá', _id: 3 },
  { name: 'Trung bình khá', _id: 4 },
  { name: 'Trung bình', _id: 5 },
  { name: 'Không xếp hạng', _id: 6 },
  { name: 'Không', _id: 7 }
];

export const contractTypes = [
  { name: 'Hợp đồng lao động', _id: 1 },
  { name: 'Hợp đồng dịch vụ', _id: 2 },
  { name: 'Hợp dồng thử việc', _id: 3 },
  { name: 'Hợp đồng theo dự án', _id: 4 }
];

export const contractStatus = [
  { name: 'Đang hiệu lực', _id: 1, severity: 'success' },
  { name: 'Hết hiệu lực', _id: 2, severity: 'warning' },
  { name: 'Chưa hiệu lực', _id: 3, severity: 'info' },
  { name: 'Đã chấm dứt', _id: 4, severity: 'danger' }
];

export const templateTypes = [
  { name: 'Hợp đồng lao động', _id: 1 },
  { name: 'Hợp đồng dịch vụ', _id: 2 },
  { name: 'Hợp dồng thử việc', _id: 3 },
  { name: 'Hợp đồng theo dự án', _id: 4 },
  { name: 'Phiếu lương', _id: 5 },
  { name: 'Quên mật khẩu', _id: 6 },
  { name: 'Cảnh báo chấm công', _id: 7 },
];

export const logStatus = [
  { name: 'Đang gửi', _id: 0, severity: 'warning' },
  { name: 'Đã gửi', _id: 1, severity: 'success' },
  { name: 'Có lỗi', _id: 2, severity: 'danger' }
];

export const deviceTypes = [
  { name: 'Chấm công khuôn mặt', _id: 1 },
  { name: 'Chấm công vân tay', _id: 2 },
  { name: 'Chấm công thẻ từ', _id: 3 }
];

export const days = [
  { name: 'Chủ nhật', _id: 'su' },
  { name: 'Thứ 2', _id: 'mo' },
  { name: 'Thứ 3', _id: 'tu' },
  { name: 'Thứ 4', _id: 'we' },
  { name: 'Thứ 5', _id: 'th' },
  { name: 'Thứ 6', _id: 'fr' },
  { name: 'Thứ 7', _id: 'sa' }
];

export const sheduleTypes = [
  { name: 'Ca bình thường', _id: 1 },
  { name: 'Ca OT', _id: 2 }
];

export const applicationTypes = [
  { name: 'Đơn xin nghỉ phép (phép năm)', _id: 1 },
  { name: 'Đơn xin nghỉ (không phép)', _id: 2 },
  { name: 'Đơn xin nghỉ phép (phép đặc biệt)', _id: 3 },
  { name: 'Đơn xác nhận công', _id: 4 },
  { name: 'Đơn xin đi trễ, về sớm', _id: 5 },
  { name: 'Đơn xin làm thêm giờ', _id: 6 },
  { name: 'Đơn công tác', _id: 7 },
  { name: 'Đơn xin nghỉ dài hạn', _id: 8 },
  { name: 'Yêu cầu tính lại lương', _id: 9 },
];

export const applicationStatus = [
  { name: 'Chờ duyệt', _id: 1, severity: 'warning' },
  { name: 'Đã duyệt', _id: 2, severity: 'success' },
  { name: 'Từ chối', _id: 3, severity: 'danger' },
  { name: 'Hủy', _id: 4, severity: 'info' }
];

export const importLogStatus = [
  { name: 'Thành công', _id: 1, severity: 'success' },
  { name: 'Thất bại', _id: 0, severity: 'danger' }
];

export const salaryLogStatus = [
  { name: 'Đang xử lý', _id: 1 },
  { name: 'Đã xử lý', _id: 2 }
];

export const bonusTypes = [
  { name: 'Thưởng cố định (VNĐ)', _id: 1 },
  { name: 'Thưởng theo % lương cơ bản', _id: 2 }
];

export const soonLateTypes = [
  { name: 'Trừ trực tiếp (VNĐ)', _id: 1 },
  { name: 'Trừ theo % công', _id: 2 }
];

export const salaryStatus = [
  { name: 'Chờ xác nhận', _id: 1, severity: 'warning' },
  { name: 'Chờ trưởng phòng duyệt', _id: 2, severity: 'info' },
  { name: 'Chờ giám đốc duyệt', _id: 3, severity: 'success' },
  { name: 'Đã duyệt', _id: 4, severity: 'success' },
];

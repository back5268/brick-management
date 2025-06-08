import { Cardz, Columnz, Tablez } from "@components/core";

export const DepartmentReport = ({ data = [] }) => {
  return (
    <Cardz className="w-full h-full py-8">
      <h2 className="font-bold uppercase leading-normal mb-4 text-primary">Báo cáo nhân sự theo phòng ban</h2>
      <hr className="mb-4" />
      <Tablez value={data} rows={100} dataKey="_id" paginatorTemplate="" rowsPerPageOptions={[100]} params={{ page: 1, limit: 100 }}>
        <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
        <Columnz header="Phòng ban" field="name" />
        <Columnz header="Mã phòng ban" field="code" />
        <Columnz header="Tổng nhân viên" field="total" />
        <Columnz header="Nhân viên chính thức" field="official" />
        <Columnz header="Nhân viên thử việc" field="probation" />
        <Columnz header="Thực tập sinh" field="intern" />
      </Tablez>
    </Cardz>
  );
};

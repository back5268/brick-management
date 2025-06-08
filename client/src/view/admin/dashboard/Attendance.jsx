import { Body } from '@components/base';
import { Cardz, Columnz, Tablez } from '@components/core';
import { formatNumber, roundNumber } from '@lib/helper';
import { useDataState } from '@store';

export const Attendance = ({ data = [] }) => {
  const { accounts, departments } = useDataState();
  const summary = [
    { name: 'Số nhân viên đi muộn', value: data?.length },
    { name: 'Tổng thời gian đi muộn (giờ)', value: data?.reduce((a, b) => a + roundNumber(b.totalLate + b.totalSoon), 0) }
  ];

  return (
    <Cardz className="w-full h-full py-8">
      <h2 className="font-bold uppercase leading-normal mb-4 text-primary">Thống kê thời gian đi muộn/về sớm</h2>
      <hr className="mb-4" />
      <div className='w-full flex justify-evenly my-6'>
        {summary.map((sum, index) => <div key={index} className='flex flex-col gap-0 justify-center border-2 border-primary/50 rounded-md items-center py-2 px-4 min-w-60'>
          <span className='border-b w-full text-center pb-1'>{sum.name}</span>
          <span className='font-semibold text-lg text-primary'>{sum.value}</span>
        </div>)}
      </div>
      <Tablez value={data} rows={100} dataKey="account" paginatorTemplate="" rowsPerPageOptions={[100]} params={{ page: 1, limit: 100 }}>
        <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
        <Columnz header="Phòng ban" body={(e) => Body(departments, e.department)} />
        <Columnz header="Tên nhân viên" body={(e) => Body(accounts, e.account, '_id', 'fullName')} />
        <Columnz header="Mã nhân viên" body={(e) => Body(accounts, e.account, '_id', 'staffCode')} />
        <Columnz header="Tổng thời gian đi muộn" body={(e) => formatNumber(e.totalLate)} />
        <Columnz header="Tổng thời gian về sớm" body={(e) => formatNumber(e.totalSoon)} />
      </Tablez>
    </Cardz>
  );
};

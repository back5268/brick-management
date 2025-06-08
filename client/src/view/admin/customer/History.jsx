import { getListEmployeeInfoApi, getListPriceByCustomerApi } from '@api';
import { Buttonz, Columnz, Tablez } from '@components/core';
import { useGetApi } from '@lib/react-query';
import { useNavigate } from 'react-router-dom';
import { Body, TimeBody } from '@components/base';
import { useEffect, useState } from 'react';
import { formatNumber } from '@lib/helper';

export const History = ({ _id }) => {
  const navigate = useNavigate();
  const isUpdate = Boolean(_id);
  const { isLoading, data } = useGetApi(getListPriceByCustomerApi, { _id }, 'History', isUpdate);
  const { data: employees } = useGetApi(getListEmployeeInfoApi, {}, 'Employees');
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (Array.isArray(data) && data.length) {
      const dataz = [];
      data.forEach((d) => {
        const index = dataz.findIndex((dz) => d.key === dz.key);
        if (index >= 0) dataz[index].data.push(d);
        else dataz.push({ ...d, data: [d] });
      });
      setLogs(dataz);
    }
  }, [data]);

  return (
    <>
      <div className="relative w-full mt-4 px-2">
        <Tablez
          value={logs}
          totalRecords={logs?.length}
          rows={100}
          rowsPerPageOptions={[100]}
          params={{ page: 1, limit: 100 }}
          dataKey="key"
          emptyMessage="."
          paginatorTemplate="CurrentPageReport"
          loading={isLoading}
        >
          <Columnz header="Thời gian" body={(e) => TimeBody(e.createdAt)} />
          <Columnz
            header="Thông tin bảng giá"
            body={(e) => (
              <div className="flex flex-col gap-2">
                {e?.data?.map((item, index) => (
                  <div key={index} className="flex gap-2 border-b border-dashed border-border my-2">
                    <span className="text-nowrap">+ {item.category?.name}:</span>
                    <span className="text-nowrap font-medium">{item.description}</span>
                  </div>
                ))}
              </div>
            )}
          />
          <Columnz header="Người cập nhật" body={(e) => Body(employees, e.account, '_id', 'fullName')} />
        </Tablez>
      </div>
      <hr className="my-6" />
      <div className="flex gap-4 justify-end">
        <Buttonz outlined label="Trở lại" onClick={() => navigate(-1)} />
      </div>
    </>
  );
};

import { getListEmployeeInfoApi, getListWarehouseReceiptApi } from '@api';
import { DataTable, FormList, DataFilter, Body } from '@components/base';
import { Calendarzz, Columnz, Dropdownzz, Inputzz, Tablez } from '@components/core';
import { stackingMethods, warehouseReceiptTypes } from '@constant';
import { useGetParams } from '@hooks';
import { databaseDate, formatDate, formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export * from './Detail';

const handleParams = (params) => {
  if (Array.isArray(params.dates) && params.dates.length > 0) {
    params.fromDate = databaseDate(params.dates[0], 'date');
    params.toDate = params.dates[1] ? databaseDate(params.dates[1], 'date', true) : databaseDate(params.dates[0], 'date', true);
  }
  return { ...params, dates: undefined };
};
export const WarehouseReceipt = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListWarehouseReceiptApi, handleParams(params), 'WarehouseReceipt');
  const { data: employees } = useGetApi(getListEmployeeInfoApi, {}, 'Employees');

  return (
    <FormList title="Danh sách phiếu">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-full">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo mã phiếu"
        />
        <Calendarzz
          selectionMode="range"
          readOnlyInput
          hideOnRangeSelection
          label="Khoảng thời gian (*)"
          value={filter.dates}
          onChange={(e) => setFilter({ ...filter, dates: e.value })}
        />
        <Dropdownzz
          value={filter.account}
          onChange={(e) => setFilter({ ...filter, account: e.target.value })}
          options={employees}
          optionLabel="fullName"
          label="Nhân viên"
          showClear
        />
        <Dropdownzz
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          options={warehouseReceiptTypes}
          label="Hình thức"
          showClear
        />
      </DataFilter>
      <DataTable
        title="phiếu"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={handleParams(params)}
        setParams={setParams}
        baseActions={['create', 'detail']}
        headerInfo={{
          onCreate: () => {
            navigate('/warehouse-receipt/create');
          }
        }}
        actionsInfo={{
          onViewDetail: (item) => navigate(`/warehouse-receipt/detail/${item._id}`)
        }}
      >
        <Columnz header="Mã phiếu" field="code" />
        <Columnz header="Hình thức" body={(e) => Body(warehouseReceiptTypes, e.type)} />
        <Columnz
          header="Thông tin sản phẩm"
          body={(e) => (
            <Tablez
              value={e.items}
              rows={100}
              rowsPerPageOptions={[100]}
              params={{ page: 1, limit: 100 }}
              dataKey="_id"
              emptyMessage="."
              paginatorTemplate=""
            >
              <Columnz header="Loại gạch" field="categoryName" />
              <Columnz header="Cách xếp" body={(e) => Body(stackingMethods, e.stackingMethod)} />
              <Columnz
                header="Số lượng"
                body={(e) => `${formatNumber(e.quantity)} ${e.stackingMethod === 'pallet' ? ' Pallet' : ' Viên'}`}
              />
              <Columnz header="Tổng cộng (Viên)" body={(e) => formatNumber(e.amount)} />
            </Tablez>
          )}
        />
        <Columnz
          header="Ghi chú"
          body={(e) => (
            <div className="flex flex-col gap-1">
              <span>{e.note}</span>
              {e.order && (
                <Link to={`/order?page=1&limit=10&keySearch=${e.order.code}`} target="_blank" className="text-primary">
                  {e.order.code}
                </Link>
              )}
            </div>
          )}
        />
        <Columnz
          header="Thời gian tạo"
          body={(e) => (
            <div className="flex flex-col gap-1 items-center">
              <span>{formatDate(e.createdAt)}</span>
              <span>{e.account?.fullName}</span>
            </div>
          )}
        />
      </DataTable>
    </FormList>
  );
};

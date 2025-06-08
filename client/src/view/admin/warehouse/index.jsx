import { deleteWarehouseApi, getListWarehouseApi, updateWarehouseApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Dropdownzz, Inputzz, Tablez } from '@components/core';
import { status } from '@constant';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailWarehouse } from './Detail';
import { formatNumber } from '@lib/helper';

export const Warehouse = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListWarehouseApi, params, 'Warehouse');
  const [open, setOpen] = useState(false);

  return (
    <FormList title="Danh sách kho hàng">
      <DetailWarehouse open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-2/4">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã kho"
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={status}
          label="Trạng thái"
          showClear
        />
      </DataFilter>
      <DataTable
        title="kho hàng"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail']}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteWarehouseApi
        }}
        statusInfo={{ changeStatusApi: updateWarehouseApi }}
        headerInfo={{
          onCreate: () => {
            setOpen(true);
          }
        }}
      >
        <Columnz header="Tên kho" field="name" />
        <Columnz header="Mã kho" field="code" />
        <Columnz header="Vị trí" field="location" />
        <Columnz
          header="Vị trí"
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
              <Columnz header="Loại gạch" field="category.name" />
              <Columnz
                header="Số lượng trong kho"
                body={(e) => `${formatNumber(e.amount)} viên`}
              />
            </Tablez>
          )}
        />
      </DataTable>
    </FormList>
  );
};

import { cancelOrderApi, exportOrderApi, getListCustomerInfoApi, getListEmployeeInfoApi, getListOrderApi } from '@api';
import { DataTable, FormList, DataFilter, Body } from '@components/base';
import { Buttonz, Calendarzz, Columnz, Dropdownzz, Inputzz, Tablez } from '@components/core';
import { orderStatus, stackingMethods } from '@constant';
import { PrinterIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useGetParams } from '@hooks';
import { databaseDate, formatDate, formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { useToastState } from '@store';
import { confirmDialog } from 'primereact/confirmdialog';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export * from './Detail';
export * from './Print';

const handleParams = (params) => {
  if (Array.isArray(params.dates) && params.dates.length > 0) {
    params.fromDate = databaseDate(params.dates[0], 'date');
    params.toDate = params.dates[1] ? databaseDate(params.dates[1], 'date', true) : databaseDate(params.dates[0], 'date', true);
  }
  return { ...params, dates: undefined };
};
export const Order = ({ customer }) => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListOrderApi, handleParams({ customer, ...params }), 'Order');
  const { data: employees } = useGetApi(getListEmployeeInfoApi, {}, 'Employees');
  const { data: customers } = useGetApi(getListCustomerInfoApi, {}, 'Customers');
  const { showToast } = useToastState();

  const onCancel = (item) => {
    if (item.status !== 0) return showToast({ title: 'Đơn hàng đã được xuất không thể hủy!', severity: 'warning' });
    confirmDialog({
      message: `Bạn có chắc chắn muốn hủy đơn hàng ${item.code}`,
      header: 'Brick Management',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await cancelOrderApi({ _id: item._id });
        if (response) {
          showToast({ title: 'Hủy đơn hàng thành công!', severity: 'success' });
          setParams((pre) => ({ ...pre, render: !pre.render }));
        }
      }
    });
  };

  const onPrint = (item) => {
    if (item.status === 0)
      confirmDialog({
        message: `Bạn có chắc chắn muốn in đơn hàng ${item.code}, in xong sẽ không thể hủy`,
        header: 'Brick Management',
        icon: 'pi pi-info-circle',
        accept: () => navigate(`/order/print/${item._id}`)
      });
    else window.open(`/order/print/${item._id}`, '_blank');
  };

  return (
    <FormList title={Boolean(customer) ? '' : 'Danh sách đơn hàng'}>
      {Boolean(customer) ? (
        <br />
      ) : (
        <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-3/4">
          <Inputzz
            value={filter.keySearch}
            onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
            label="Tìm kiếm theo mã đơn hàng"
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
            value={filter.customer}
            onChange={(e) => setFilter({ ...filter, customer: e.target.value })}
            options={customers}
            optionLabel="fullName"
            label="Khách hàng"
            showClear
          />
          <Dropdownzz
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            options={orderStatus}
            label="Trạng thái"
            showClear
          />
        </DataFilter>
      )}
      <DataTable
        title="đơn hàng"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={handleParams(params)}
        setParams={setParams}
        baseActions={Boolean(customer) ? [] : ['create', 'export']}
        headerInfo={{
          onCreate: () => {
            navigate('/order/create');
          },
          exportApi: (params) => exportOrderApi(handleParams(params))
        }}
        hideParams={Boolean(customer)}
      >
        <Columnz header="Mã đơn hàng" field="code" />
        <Columnz header="Khách hàng" field="customer.fullName" />
        <Columnz
          header="Thông tin sản phẩm"
          body={(e) => (
            <Tablez
              value={e.items}
              rows={100}
              rowsPerPageOptions={[100]}
              params={{ page: 1, limit: 100 }}
              dataKey="idz"
              emptyMessage="."
              paginatorTemplate=""
            >
              <Columnz header="Loại gạch" field="categoryName" />
              <Columnz header="Cách xếp" body={(e) => Body(stackingMethods, e.stackingMethod)} />
              <Columnz header="Đơn giá" body={(e) => formatNumber(e.unitPrice)} />
              <Columnz header="Số lượng (Viên)" body={(e) => formatNumber(e.amount)} />
              <Columnz header="Cược Pallet" body={(e) => formatNumber(e.palletDeposit)} />
              <Columnz header="Thành tiền" body={(e) => formatNumber(e.totalPrice)} />
            </Tablez>
          )}
        />
        <Columnz header="Thành tiền" body={(e) => formatNumber(e.totalAmount)} />
        <Columnz
          header="Thời gian tạo"
          body={(e) => (
            <div className="flex flex-col gap-1 items-center">
              <span>{formatDate(e.createdAt)}</span>
              <span>{e.account?.fullName}</span>
            </div>
          )}
        />
        <Columnz header="Trạng thái" body={(e) => Body(orderStatus, e.status)} />
        <Columnz
          header="Thao tác"
          body={(e) => (
            <div className="flex justify-center items-center gap-2">
              <Buttonz
                onClick={() => onPrint(e)}
                outlined
                className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                icon={<PrinterIcon className="w-6" />}
              />
              <Buttonz
                severity="danger"
                outlined
                onClick={() => onCancel(e)}
                className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                icon={<XMarkIcon className="w-5" />}
              />
            </div>
          )}
        />
      </DataTable>
    </FormList>
  );
};

import { deleteEmployeeApi, getListEmployeeApi, resetPasswordApi, updateEmployeeApi } from '@api';
import { DataTable, FormList, DataFilter, Body } from '@components/base';
import { Buttonz, Columnz, Dialogz, Dropdownzz, Inputzz } from '@components/core';
import { status, userPermission } from '@constant';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import { useToastState } from '@store';
import { confirmDialog } from 'primereact/confirmdialog';
import React, { useState } from 'react';
import { DetailEmployee } from './Detail';

export const Employee = () => {
  const initParams = useGetParams();
  const { showToast } = useToastState();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListEmployeeApi, params, 'Employee');
  const [password, setPassword] = useState(null);
  const [open, setOpen] = useState(false);

  const onResetPassword = (item) => {
    confirmDialog({
      message: `Bạn có chắc chắn muốn đổi mật khẩu nhân viên ${item.fullName}`,
      header: 'Brick Management',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await resetPasswordApi({ _id: item._id });
        if (response) {
          showToast({ title: 'Đổi mật khẩu thành công!', severity: 'success' });
          setPassword(response);
        }
      }
    });
  };

  return (
    <FormList title="Danh sách nhân viên">
      <DetailEmployee open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <Dialogz header="Brick Management" open={Boolean(password)} setOpen={setPassword} position="center" width="500px">
        <div className="p-6 text-left">
          Đổi mật khẩu thành công, mật khẩu mới là <b>{password}</b>
        </div>
        <hr />
        <div className="flex gap-4 justify-end mt-4">
          <Buttonz label="Xác nhận" onClick={async () => setPassword(false)} />
        </div>
      </Dialogz>
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-full">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, tài khoản"
        />
        <Inputzz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo số điện thoại, email"
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={status}
          label="Trạng thái"
          showClear
        />
        <Dropdownzz
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          options={userPermission}
          label="Vai trò"
          showClear
        />
      </DataFilter>
      <DataTable
        title="Nhân viên"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail']}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteEmployeeApi,
          moreActions: [
            {
              icon: ArrowPathIcon,
              onClick: (item) => onResetPassword(item)
            }
          ]
        }}
        statusInfo={{ changeStatusApi: updateEmployeeApi }}
        headerInfo={{
          onCreate: () => {
            setOpen(true);
          }
        }}
      >
        <Columnz header="Tên nhân viên" field="fullName" />
        <Columnz header="Email" field="email" />
        <Columnz header="Số điện thoại" field="phone" />
        <Columnz header="Tài khoản" field="username" />
        <Columnz header="Vai trò" body={e => Body(userPermission, e.role)} />
      </DataTable>
    </FormList>
  );
};

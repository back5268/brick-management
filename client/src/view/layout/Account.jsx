import { getListBankInfoApi } from '@api';
import { Buttonz, CalendarFormz, Dialogz, DropdownFormz, InputFormz } from '@components/core';
import { employeeTypes } from '@constant';
import { convertNumberToString } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import React from 'react';

export const Account = (props) => {
  const { open, setOpen, data } = props;
  const { data: banks } = useGetApi(getListBankInfoApi, {}, 'banks');

  return (
    <Dialogz className="w-[1200px]" header="Thông tin cá nhân" open={open} setOpen={setOpen}>
      <div className="border-t border-border">
        <div className="w-full h-bodyModal overflow-scroll">
          <div className="flex flex-wrap mt-8">
            <div className="w-full flex justify-center lg:w-4/12 px-2">
              <div
                className="relative h-48 w-48 rounded-md bg-cover"
                style={{ backgroundImage: `url(${data?.avatar || '/images/avatar.jpg'})` }}
              ></div>
            </div>
            <div className="w-full lg:w-8/12 px-2">
              <div className="flex flex-wrap">
                <InputFormz label="Mã nhân viên (*)" value={data?.staffCode} disabled />
                <InputFormz id="fullName" label="Tên Nhân viên (*)" value={data?.fullName} disabled />
                <InputFormz id="email" label="Email (*)" value={data?.email} disabled />
                <InputFormz id="phone" label="Số điện thoại (*)" value={data?.phone} disabled />
                <CalendarFormz id="birthday" label="Ngày sinh (*)" value={new Date(data?.birthday)} disabled />
                <InputFormz id="cmt" label="Chứng minh thư (*)" value={data?.cmt} disabled />
                <CalendarFormz id="dateOfIssue" label="Ngày Cấp (*)" value={new Date(data?.dateOfIssue)} disabled />
                <InputFormz id="placeOfIssue" label="Nơi cấp (*)" value={data?.placeOfIssue} disabled />
                <InputFormz id="address" label="Địa chỉ thường trú (*)" value={data?.address} disabled />
                <div className="mb-4 w-full mt-6 px-2">
                  <label className="inline-block font-medium text-left">Thông tin Làm việc</label>
                  <hr />
                </div>
                <DropdownFormz id="type" label="Loại nhân nhiên (*)" options={employeeTypes} value={data?.type} disabled />
                <InputFormz id="department" label="Phòng ban (*)" value={data?.department?.name} disabled />
                <InputFormz id="position" label="Chức vụ (*)" value={data?.position?.name} disabled />
                <InputFormz id="jobPosition" label="Vị trí công việc (*)" value={data?.jobPosition?.name} disabled />
                <CalendarFormz id="dateIn" label="Ngày vào (*)" value={new Date(data?.dateIn)} disabled />
                <InputFormz id="bankAccount" label="Số tài khoản (*)" value={data?.bankAccount} disabled />
                <DropdownFormz id="bank" label="Ngân hàng (*)" options={banks} value={data?.bank} disabled />
                <InputFormz
                  min={0}
                  type="number"
                  id="salary"
                  label="Lương cơ bản (*)"
                  value={data?.salary}
                  helper={data?.salary ? convertNumberToString(data?.salary) : ''}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz outlined color="red" label="Trờ lại" onClick={() => setOpen(false)} />
          <Buttonz label="Xác nhận" type="submit" onClick={() => setOpen(false)} />
        </div>
      </div>
    </Dialogz>
  );
};

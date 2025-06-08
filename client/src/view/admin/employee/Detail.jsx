import { EmployeeValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { createEmployeeApi, updateEmployeeApi } from '@api';
import { DropdownFormz, InputFormz } from '@components/core';
import { userPermission } from '@constant';

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  username: '',
  role: ''
};

export const DetailEmployee = (props) => {
  const { open, setOpen, setParams, data } = props;
  const isUpdate = typeof open === 'string';
  const item = isUpdate ? data.find((d) => d._id === open) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch
  } = useForm({
    resolver: yupResolver(EmployeeValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: open };
    else return newData;
  };

  return (
    <FormDetail
      title="nhân viên"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      handleData={handleData}
      handleSubmit={handleSubmit}
      createApi={createEmployeeApi}
      updateApi={updateEmployeeApi}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="fullName" label="Họ tên (*)" value={watch('fullName')} errors={errors} register={register} />
        <InputFormz id="email" label="Email (*)" value={watch('email')} errors={errors} register={register} type="email" />
        <InputFormz id="phone" label="Số điện thoại (*)" value={watch('phone')} errors={errors} register={register} type="phone" />
        <InputFormz id="username" label="Tài khoản" value={watch('username')} errors={errors} register={register} />
        <DropdownFormz
          id="role"
          label="Vai trò (*)"
          options={userPermission}
          errors={errors}
          onChange={(e) => setValue('role', e.target.value)}
          value={watch('role')}
        />
      </div>
    </FormDetail>
  );
};

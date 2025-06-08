import { WarehouseValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@lib/helper';
import { createWarehouseApi, updateWarehouseApi } from '@api';
import { InputFormz, TextAreaz } from '@components/core';

const defaultValues = {
  name: '',
  code: '',
  location: '',
  note: '',
};

export const DetailWarehouse = (props) => {
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
    resolver: yupResolver(WarehouseValidation),
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
      title="kho hàng"
      open={open}
      setOpen={() => {
        setOpen(false);
        reset();
      }}
      isUpdate={isUpdate}
      handleData={handleData}
      handleSubmit={handleSubmit}
      createApi={createWarehouseApi}
      updateApi={updateWarehouseApi}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="name" label="Tên kho hàng (*)" value={watch('name')} errors={errors} register={register} />
        <InputFormz id="code" label="Mã kho hàng (*)" value={watch('code')} errors={errors} register={register} />
        <InputFormz id="location" label="Vị trí kho hàng (*)" value={watch('location')} errors={errors} register={register} />
        <TextAreaz id="note" label="Ghi chú" value={watch('note')} errors={errors} register={register} />
      </div>
    </FormDetail>
  );
};

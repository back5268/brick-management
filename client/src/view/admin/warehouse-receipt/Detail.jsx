import { createWarehouseReceiptApi, detailWarehouseReceiptApi, getListCategoryInfoApi, getListWarehouseInfoApi } from '@api';
import { FormDetail, UploadFiles } from '@components/base';
import { DropdownFormz, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { WarehouseReceiptValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Items } from './Items';
import { warehouseReceiptTypes } from '@constant';

const defaultValues = {
  warehouse: '',
  type: 'import',
  note: ''
};

export const DetailWarehouseReceipt = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailWarehouseReceiptApi, { _id }, 'item', isUpdate);
  const { data: warehouses } = useGetApi(getListWarehouseInfoApi, {}, 'Warehouses');
  const { data: categories } = useGetApi(getListCategoryInfoApi, {}, 'Categories');
  const [items, setItems] = useState([]);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(WarehouseReceiptValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.items) setItems(item.items.map((p) => ({ ...p, idz: Date.now() })));
      if (item.files) setFiles(item.files);
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, items };
    if (items.length === 0) return 'Vui lòng thêm sản phẩm!';
    if (files) newData.formData = { files };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="phiếu"
      isUpdate={isUpdate}
      createApi={createWarehouseReceiptApi}
      updateApi={() => {}}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <DropdownFormz
          id="warehouse"
          label="Kho hàng (*)"
          options={warehouses}
          errors={errors}
          onChange={(e) => setValue('warehouse', e.target.value)}
          value={watch('warehouse')}
          disabled={isUpdate}
        />
        <DropdownFormz
          id="type"
          label="Hình thức (*)"
          options={warehouseReceiptTypes}
          errors={errors}
          onChange={(e) => setValue('type', e.target.value)}
          value={watch('type')}
          disabled={isUpdate}
        />
        <Items data={items} setData={setItems} disabled={isUpdate} categories={categories} />
        <TextAreaz id="note" label="Ghi chú" value={watch('note')} errors={errors} register={register} />
        <UploadFiles max={10} label="File đính kèm" files={files} setFiles={setFiles} />
      </div>
    </FormDetail>
  );
};

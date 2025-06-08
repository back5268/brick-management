import { createPermissionApi, detailPermissionApi, getListToolApi, updatePermissionApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownFormz, InputFormz, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { PermissionValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Tool } from './Tool';
import { userPermission } from '@constant';

const defaultValues = {
  name: '',
  role: ''
};

export const DetailPermission = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailPermissionApi, { _id }, 'permissionz', isUpdate);
  const { data: toolData } = useGetApi(getListToolApi, { status: 1 }, 'tools');
  const [tools, setTools] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(PermissionValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.tools) {
        const newTool = [];
        item.tools.forEach((tool) => {
          tool?.actions.forEach((action) => {
            newTool.push(`${tool.route}---${action}`);
          });
        });
        setTools(newTool);
      }
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data };
    if (tools?.length > 0) {
      const newTools = [];
      tools.forEach((tool) => {
        const arr = tool.split('---');
        const index = newTools.findIndex((n) => n.route === arr[0]);
        if (index >= 0) newTools[index].actions.push(arr[1]);
        else newTools.push({ route: arr[0], actions: [arr[1]] });
      });
      newData.tools = newTools;
    }
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="nhóm quyền"
      isUpdate={isUpdate}
      createApi={createPermissionApi}
      updateApi={updatePermissionApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <InputFormz id="name" label="Tên nhóm quyền (*)" value={watch('name')} errors={errors} register={register} />
        <DropdownFormz
          id="role"
          label="Vai trò (*)"
          options={userPermission?.filter(u => u._id !== 'admin')}
          errors={errors}
          onChange={(e) => setValue('role', e.target.value)}
          value={watch('role')}
        />
        <TextAreaz id="description" label="Mô tả" value={watch('description')} errors={errors} register={register} />
        <div className="w-full card mx-2 mt-4">
          {toolData?.map((tool, index) => {
            return (
              <div key={index}>
                <Tool value={tools} setValue={setTools} tool={tool} />
                <hr />
              </div>
            );
          })}
        </div>
      </div>
    </FormDetail>
  );
};

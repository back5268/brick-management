import React, { useEffect, useState } from 'react';
import { TrashIcon, DocumentMagnifyingGlassIcon, ArrowDownTrayIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useToastState } from '@store';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeSpecialCharacter } from '@lib/helper';
import { Buttonz, Columnz, SplitButtonz, Switchz, Tablez } from '@components/core';
import { confirmDialog } from 'primereact/confirmdialog';

export const DataTable = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToastState();
  const [isLoading, setIsLoading] = useState(false);
  const {
    title,
    data = [],
    total = 0,
    loading = false,
    key = '_id',
    params = { page: 1, limit: 10 },
    setParams = () => {},
    actionsInfo = {},
    headerInfo = {},
    statusInfo = {},
    baseActions = [],
    rows = [10, 20, 50, 100, 200, 500],
    select,
    setSelect,
    onSuccess = () => {},
    hideParams
  } = props;
  const {
    onViewDetail = () => {},
    onDelete,
    deleteApi = () => {},
    handleDelete = (item) => ({ _id: item._id }),
    moreActions,
    isHideDelete = () => false
  } = actionsInfo;
  const { onCreate = () => {}, onImport = () => {}, exportApi, moreHeader, items } = headerInfo;
  const { changeStatusApi = () => {}, handleChangeStatus = (item) => ({ _id: item._id, status: item.status ? 0 : 1 }) } = statusInfo;
  const isActions = baseActions.includes('detail') || baseActions.includes('delete') || Boolean(moreActions);
  const isHeader =
    baseActions.includes('create') || baseActions.includes('import') || baseActions.includes('export') || moreHeader || items;
  const isStatus = Boolean(statusInfo.changeStatusApi);

  const onDeletez = (item) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn xóa dữ liệu này!',
      header: 'Brick Management',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await deleteApi(handleDelete(item));
        if (response) showToast({ title: 'Xóa dữ liệu thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const onExport = async () => {
    setIsLoading(true);
    const response = await exportApi({ ...params, page: undefined, limit: undefined });
    setIsLoading(false);
    if (response) {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(response);
      downloadLink.download = (title && `ket-qua-export-${removeSpecialCharacter(title)}.xlsx`) || 'data.xlsx';
      downloadLink.click();
      showToast({ title: `Export ${title?.toLowerCase()} thành công!`, severity: 'success' });
    }
  };

  const onChangeStatus = (item) => {
    confirmDialog({
      message: 'Bạn có chắc chắn muốn chuyển trạng thái dữ liệu này!',
      header: 'Brick Management',
      icon: 'pi pi-info-circle',
      accept: async () => {
        const response = await changeStatusApi(handleChangeStatus(item));
        if (response) showToast({ title: 'Chuyển trạng thái thành công!', severity: 'success' });
        setParams((pre) => ({ ...pre, render: !pre.render }));
        onSuccess(item);
      }
    });
  };

  const handleSelect = (callback = () => {}) => {
    if (!(select?.length > 0)) return showToast({ title: `Vui lòng chọn ${title || 'dữ liệu'}!`, severity: 'warning' });
    callback();
  };

  useEffect(() => {
    if (hideParams) return;
    const query = {};
    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (!['render'].includes(key) && !['', undefined, null].includes(value)) query[key] = value;
      }
    }
    navigate(location.pathname + '?' + new URLSearchParams(query).toString());
  }, [JSON.stringify(params)]);

  const onPage = (event) => {
    setParams({
      ...params,
      limit: event.rows,
      page: event.page !== 0 ? event.page + 1 : 1
    });
  };

  const header = (
    <div className="flex gap-4 justify-start mb-1">
      {baseActions.includes('create') && <Buttonz onClick={onCreate}>Thêm mới</Buttonz>}
      {baseActions.includes('import') && (
        <Buttonz
          severity="success"
          onClick={onImport}
          className="flex gap-4 items-center"
          icon={<ArrowUpTrayIcon className="h-5 w-5 stroke-2" />}
        >
          Import
        </Buttonz>
      )}
      {baseActions.includes('export') && (
        <Buttonz
          severity="success"
          onClick={onExport}
          loading={isLoading}
          className="flex gap-4 items-center"
          icon={<ArrowDownTrayIcon className="h-5 w-5 stroke-2" />}
        >
          Export
        </Buttonz>
      )}
      {items?.length > 0 && (
        <SplitButtonz model={items.map((item) => ({ ...item, onClick: () => handleSelect(item.onClick) }))} label="Tác vụ" raised />
      )}
      {moreHeader?.length > 0 &&
        moreHeader.map((header, index) => {
          return (
            <Buttonz key={index} severity={header.severity} onClick={() => header.onClick()}>
              {header.children() || ''}
            </Buttonz>
          );
        })}
    </div>
  );

  return (
    <div className="w-full px-2 rounded-md overflow-hidden">
      <Tablez
        header={isHeader && header}
        params={params}
        rows={params.limit}
        value={data}
        totalRecords={total}
        rowsPerPageOptions={rows}
        onPage={onPage}
        dataKey={key}
        loading={loading}
        emptyMessage={'Không tìm thấy ' + title?.toLowerCase() || ''}
        selection={select}
        onSelectionChange={(e) => {
          if (setSelect) setSelect(e.value);
        }}
      >
        {select && setSelect && <Columnz selectionMode="multiple" />}
        <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
        {props.children}
        {isStatus && (
          <Columnz
            headerStyle={{ padding: 'auto', textAlign: 'center' }}
            header="Trạng thái"
            body={(item) => (
              <div className="flex justify-center items-center">
                <Switchz checked={Boolean(item.status)} onChange={() => onChangeStatus(item)} />
              </div>
            )}
          />
        )}
        {isActions && (
          <Columnz
            header="Thao tác"
            body={(item) => {
              const isHide = isHideDelete && isHideDelete(item);

              return (
                <div className="flex justify-center items-center gap-2">
                  {baseActions.includes('detail') && (
                    <Buttonz
                      onClick={() => onViewDetail(item)}
                      outlined
                      className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                      icon={<DocumentMagnifyingGlassIcon className="w-6" />}
                    />
                  )}
                  {baseActions.includes('delete') && !isHide && (
                    <Buttonz
                      severity="danger"
                      outlined
                      onClick={() => (onDelete ? onDelete(item) : onDeletez(item))}
                      className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                      icon={<TrashIcon className="w-5" />}
                    />
                  )}
                  {moreActions?.length > 0 &&
                    moreActions.map((action, index) => {
                      const severity = action.severity || '';
                      const Icon = action.icon;
                      const isHide = action.isHide && action.isHide(item);

                      return (
                        !isHide && (
                          <Buttonz
                            key={index}
                            severity={severity}
                            outlined
                            onClick={() => action.onClick(item)}
                            className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                            icon={<Icon className="w-6" />}
                          />
                        )
                      );
                    })}
                </div>
              );
            }}
          />
        )}
      </Tablez>
    </div>
  );
};

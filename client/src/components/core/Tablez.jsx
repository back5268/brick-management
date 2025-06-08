import { DataTable } from 'primereact/datatable';

const convertParams = (params) => {
  if (params.first || params.first === 0) return params;
  else return { ...params, first: (params.page - 1) * params.limit };
};

export const Tablez = (props) => {
  const {
    paginator = true,
    params = {},
    paginatorTemplate = 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown',
    children,
    emptyMessage = "Không có dữ liệu",
    ...prop
  } = props;

  return (
    <DataTable
      first={convertParams(params)?.first}
      lazy
      paginatorTemplate={paginatorTemplate}
      paginator={paginator}
      rowHover
      showGridlines
      stripedRows
      scrollable
      selectionMode="checkbox"
      currentPageReportTemplate="Tổng số: {totalRecords} bản ghi"
      emptyMessage={emptyMessage}
      {...prop}
    >
      {children}
    </DataTable>
  );
};

import { Cardz } from '@components/core';
import { TabPanel, TabView } from 'primereact/tabview';
import { Info } from './Info';
import { useParams } from 'react-router-dom';
import { History } from './History';
import { Order } from '../order';

export const DetailCustomer = () => {
  const { _id } = useParams();

  return (
    <Cardz>
      {_id ? (
        <TabView>
          <TabPanel header="Thông tin khách hàng">
            <Info _id={_id} />
          </TabPanel>
          <TabPanel header="Lịch sử thay đổi bảng giá">
            <History _id={_id} />
          </TabPanel>
          <TabPanel header="Đơn hàng">
            <Order customer={_id} />
          </TabPanel>
        </TabView>
      ) : (
        <>
          <h2 className="font-bold uppercase leading-normal mb-2 p-2 text-primary">Thêm mới khách hàng</h2>
          <hr />
          <Info />
        </>
      )}
    </Cardz>
  );
};

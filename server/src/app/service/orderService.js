import { detailOrderMd } from '@models';
import { ghepGiaTri, replaceFistText } from '@utils';
import moment from 'moment';
import { JSDOM } from 'jsdom';

const template1 = `<body style="font-family: Arial, sans-serif; font-size: 14px; padding: 20px; width: 600px;">
    <div style="display: flex; justify-content: space-between; font-weight: bold;">
        <h2 style="margin: 0;">MinhThao</h2>
        <h2 style="margin: 0;">ORDER</h3>
    </div>
    <hr style="border-color: #000" />

    <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
            <p style="margin: 0 4px;">Mã đơn: $ma_don</p>
            <p style="margin: 0 4px;">$ngay_phat_hanh</p>
        </div>
        <p style="margin: 4px;">Khách hàng: $khach_hang</p>
        <p style="margin: 4px;">Địa chỉ: $dia_chi</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Loại gạch</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Số lượng</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Cược pallet</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Thanh toán</th>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 6px;">$loai_gach</td>
            <td style="border: 1px solid #000; padding: 6px;">$so_luong</td>
            <td style="border: 1px solid #000; padding: 6px;">$cuoc_pallet</td>
            <td style="border: 1px solid #000; padding: 6px;">$thanh_toan</td>
        </tr>
    </table>

    <div style="margin-top: 10px;">
        <p style="margin: 4px;">Nguyên xe: $nguyen_xe</p>
        <p style="margin: 4px;">Loại xe: $loai_xe</p>
    </div>

    <div style="display: flex; justify-content: space-between; width: 100%;">
        <div style="text-align: center; width: 45%;">
            ____________________________
            <p style="margin: 4px;">Nhân viên bán hàng</p>
        </div>
        <div style="text-align: center; width: 45%;">
            ____________________________
            <p style="margin: 4px;">Lái xe</p>
        </div>
    </div>
</body>`;
const template2 = `<body style="font-family: Arial, sans-serif; font-size: 14px; padding: 20px; width: 600px;">
    <div style="display: flex; justify-content: space-between; font-weight: bold;">
        <h2 style="margin: 0;">MinhThao</h2>
        <h2 style="margin: 0;">ORDER</h3>
    </div>
    <hr style="border-color: #000" />

    <div style="margin-top: 10px;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
            <p style="margin: 0 4px;">Mã đơn: $ma_don</p>
            <p style="margin: 0 4px;">$ngay_phat_hanh</p>
        </div>
        <p style="margin: 4px;">Khách hàng: $khach_hang</p>
        <p style="margin: 4px;">Địa chỉ: $dia_chi</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Loại gạch</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Số lượng</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Cược pallet</th>
            <th style="border: 1px solid #000; padding: 6px; text-align: center;">Thanh toán</th>
        </tr>
        <tr>
            <td style="border: 1px solid #000; padding: 6px;">$loai_gach</td>
            <td style="border: 1px solid #000; padding: 6px;">$so_luong</td>
            <td style="border: 1px solid #000; padding: 6px;">$cuoc_pallet</td>
            <td style="border: 1px solid #000; padding: 6px;">$thanh_toan</td>
        </tr>
    </table>

    <div style="margin-top: 10px;">
        <p style="margin: 4px;">Nguyên xe: $nguyen_xe</p>
        <p style="margin: 4px;">Loại xe: $loai_xe</p>
    </div>

    <div style="display: flex; justify-content: space-between; width: 100%;">
        <div style="text-align: center; width: 45%;">
            ____________________________
            <p style="margin: 4px;">Nhân viên bán hàng</p>
        </div>
        <div style="text-align: center; width: 45%;">
            ____________________________
        </div>
    </div>
    <hr style="border-color: #252525" />
    <div style="display: flex; justify-content: space-evenly; width: 100%;">
        <div style="margin: 4px;">Quản lý kho</div>
        <p style="margin: 4px;">Bảo vệ</p>
        <p style="margin: 4px;">Kế toán</p>
    </div>
</body>`;

const previewOrderz = async (data, _v) => {
  const templateHtml = new JSDOM(_v === 1 ? template1 : template2, { contentType: 'text/html' });
  const table = templateHtml.window.document.querySelector('table');
  const trs = table.querySelectorAll('tr');
  let newTable = trs[0].outerHTML;
  data.items.forEach((item, index) => {
    newTable += replaceFistText(
      ghepGiaTri({
        params: {
          $loai_gach: item.categoryName,
          $so_luong: `${item.quantity} ${item.stackingMethod === 'pallet' ? 'pallet' : 'viên'}`,
          $cuoc_pallet: `${item.palletDeposit ? 'Có' : 'Không'}`,
          $thanh_toan: `${item.paymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}`
        },
        content: trs[1].outerHTML,
        format: true
      })
    );
  });
  table.innerHTML = newTable;
  let content = templateHtml.window.document.querySelector('body').outerHTML;
  const params = {
    $ma_don: data.code,
    $khach_hang: data.customer.fullName,
    $dia_chi: data.customer.address,
    $ngay_phat_hanh: moment().format('DD/MM/YYYY'),
    $nguyen_xe: '',
    $loai_xe: '',
  };

  content = ghepGiaTri({ params, content });
  return replaceFistText(content)
};

export const previewOrderSv = async (_id, dataz) => {
  const data = dataz ? dataz : await detailOrderMd({ _id }, [{ path: 'customer', select: 'fullName address' }]);
  if (!data) return { status: 0, mess: 'Đơn hàng không tồn tại!' };
  if (data.html) return { status: 1, data: data.html }
  let html = ''
  html += await previewOrderz(data, 1)
  html += `<br />`
  html += `<br />`
  html += await previewOrderz(data, 2)
  return { status: 1, data: html }
};

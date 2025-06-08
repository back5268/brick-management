import { orderStatus, stackingMethods } from '@constant';
import { convertToExcel } from '@lib/excel-js';
import { createOrderValid, detailOrderValid, exportOrderValid, listOrderValid } from '@lib/validation';
import {
  countOrderMd,
  createOrderMd,
  createStockMd,
  createWarehouseReceiptMd,
  detailCustomerMd,
  detailOrderMd,
  detailStockMd,
  detailWarehouseMd,
  listOrderMd,
  updateOrderMd,
  updateStockMd
} from '@models';
import { previewOrderSv } from '@service/orderService';
import { validateData } from '@utils';
import moment from 'moment';
import { generateWHCode } from './warehouseReceiptController';

export const getListOrder = async (req, res) => {
  try {
    const { error, value } = validateData(listOrderValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, customer, account, status, fromDate, toDate, keySearch } = value;
    const where = {};
    if (keySearch) where.$or = [{ code: { $regex: keySearch, $options: 'i' } }];
    if (customer || customer) where.customer = customer;
    if (account || account) where.account = account;
    if (status || status === 0) where.status = status;
    if (fromDate && toDate) {
      where.createdAt = {
        $gte: fromDate,
        $lte: toDate
      };
    }
    const documents = await listOrderMd(where, page, limit, [
      { path: 'customer', select: 'fullName phone email' },
      { path: 'account', select: 'fullName phone email' }
    ]);
    const total = await countOrderMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailOrder = async (req, res) => {
  try {
    const { error, value } = validateData(detailOrderValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailOrderMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Danh mục không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { error, value } = validateData(detailOrderValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailOrderMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Đơn hàng không tồn tại!' });
    if (dataz.status > 0) return res.json({ status: 0, mess: 'Đơn hàng đã được in không thể hủy!' });
    if (dataz.status === 3) return res.json({ status: 0, mess: 'Đơn hàng đã hủy không thể hủy!' });
    const data = await updateOrderMd({ _id }, { status: 3 });

    const warehouse = dataz.warehouse
    const items = dataz.items;
    for (const item of items) {
      const stock = await detailStockMd({ warehouse, category: item.category });
      if (!stock) await createStockMd({ warehouse, category: item.category, amount: item.amount });
      else await updateStockMd({ _id: stock._id }, { amount: stock.amount + item.amount });
    }
    await createWarehouseReceiptMd({
      code: await generateWHCode('import'),
      type: 'import',
      account: req.account._id,
      order: _id,
      warehouse,
      items,
      note: 'Phiếu nhập từ hủy đơn hàng'
    });

    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

const generateOrderCode = async () => {
  const today = moment().format('YYYYMMDD');
  const prefix = `DH-${today}`;
  const count = await countOrderMd({
    createdAt: {
      $gte: moment().startOf('day').toDate(),
      $lte: moment().endOf('day').toDate()
    }
  });
  const index = String(count + 1).padStart(4, '0');
  return `${prefix}-${index}`;
};

export const createOrder = async (req, res) => {
  try {
    const { error, value } = validateData(createOrderValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { customer, items, totalAmount, warehouse } = value;
    const checkCustomer = await detailCustomerMd({ _id: customer });
    if (!checkCustomer) return res.json({ status: 0, mess: 'Khách hàng không tồn tại!' });
    if (!Array.isArray(items) || items.length === 0) return res.json({ status: 0, mess: 'Thông tin đơn hàng không đúng!' });
    const checkItem = items.find((i) => !i.category || !i.quantity || !i.unitPrice || !i.totalPrice || !i.stackingMethod);
    if (checkItem) return res.json({ status: 0, mess: 'Thông tin đơn hàng không đúng!' });
    const total = items.reduce((a, b) => a + b.totalPrice, 0);
    if (total !== totalAmount) return res.json({ status: 0, mess: 'Thông tin đơn hàng không đúng!' });

    const checkWarehouse = await detailWarehouseMd({ _id: warehouse });
    if (!checkWarehouse) return res.json({ status: 0, mess: 'Kho hàng không tồn tại!' });
    let checkStock = true;
    for (const item of items) {
      const stock = await detailStockMd({ warehouse, category: item.category });
      if (!stock) checkStock = false;
      else if (stock.amount < item.amount) checkStock = false;
      else item.stock = stock;
    }
    if (!checkStock) return res.json({ status: 0, mess: 'Số luọng sản phẩm trong kho không đủ' });
    for (const item of items) {
      await updateStockMd({ _id: item.stock._id }, { amount: item.stock.amount - item.amount });
    }

    const code = await generateOrderCode();
    const data = await createOrderMd({ code, account: req.account._id, ...value });

    await createWarehouseReceiptMd({
      code: await generateWHCode('export'),
      type: 'export',
      account: req.account._id,
      order: data._id,
      warehouse,
      items,
      note: 'Phiếu xuất từ đơn hàng'
    });

    res.status(201).json({ status: 1, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const previewOrder = async (req, res) => {
  try {
    const { error, value } = validateData(detailOrderValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const dataz = await detailOrderMd({ _id }, [{ path: 'customer', select: 'fullName address' }]);
    const { status, data, mess } = await previewOrderSv(_id, dataz);
    if (!status) return res.json({ status: 0, mess });
    await updateOrderMd({ _id }, { html: data, status: dataz.status === 0 ? 1 : undefined });
    res.json({ status: 1, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const exportOrder = async (req, res) => {
  try {
    const { error, value } = validateData(exportOrderValid, req.query);
    if (error) return res.json({ status: false, mess: error });
    const { customer, account, status, fromDate, toDate, keySearch } = value;
    const where = {};
    if (keySearch) where.$or = [{ code: { $regex: keySearch, $options: 'i' } }];
    if (customer || customer) where.customer = customer;
    if (account || account) where.account = account;
    if (status || status === 0) where.status = status;
    if (fromDate && toDate) {
      where.createdAt = {
        $gte: fromDate,
        $lte: toDate
      };
    }
    const data = await listOrderMd(where, false, false, [
      { path: 'customer', select: 'fullName phone email' },
      { path: 'account', select: 'fullName phone email' }
    ]);
    const dataz = [];
    dataz.push([
      'STT',
      'Mã đơn hàng',
      'Khách hàng',
      'Thông tin sản phẩm',
      '',
      '',
      '',
      '',
      '',
      'Thành tiền',
      'Người tạo',
      'Thời gian tạo',
      'Trạng thái'
    ]);
    dataz.push([
      'STT',
      'Mã đơn hàng',
      'Khách hàng',
      'Loại gạch',
      'Cách xếp',
      'Đơn giá',
      'Số lượng',
      'Cược Pallet',
      'Thành tiền',
      'Thành tiền',
      'Người tạo',
      'Thời gian tạo',
      'Trạng thái'
    ]);
    const options = {
      mergeCells: ['A1:A2', 'B1:B2', 'C1:C2', 'D1:I1', 'J1:J2', 'K1:K2', 'L1:L2', 'M1:M2'],
      alignments: [
        { A1: { horizontal: 'center', vertical: 'middle' } },
        { B1: { horizontal: 'center', vertical: 'middle' } },
        { C1: { horizontal: 'center', vertical: 'middle' } },
        { D1: { horizontal: 'center', vertical: 'middle' } },
        { J1: { horizontal: 'center', vertical: 'middle' } },
        { K1: { horizontal: 'center', vertical: 'middle' } },
        { L1: { horizontal: 'center', vertical: 'middle' } },
        { M1: { horizontal: 'center', vertical: 'middle' } },
        { D2: { horizontal: 'center', vertical: 'middle' } },
        { E2: { horizontal: 'center', vertical: 'middle' } },
        { F2: { horizontal: 'center', vertical: 'middle' } },
        { G2: { horizontal: 'center', vertical: 'middle' } },
        { H2: { horizontal: 'center', vertical: 'middle' } },
        { I2: { horizontal: 'center', vertical: 'middle' } }
      ],
      fonts: [
        { A1: { bold: true } },
        { B1: { bold: true } },
        { C1: { bold: true } },
        { D1: { bold: true } },
        { J1: { bold: true } },
        { K1: { bold: true } },
        { L1: { bold: true } },
        { M1: { bold: true } },
        { D2: { bold: true } },
        { E2: { bold: true } },
        { F2: { bold: true } },
        { G2: { bold: true } },
        { H2: { bold: true } },
        { I2: { bold: true } }
      ]
    };
    if (data?.length > 0) {
      let i = 3;
      data.forEach((datum, index) => {
        const status = orderStatus.find((o) => o._id === datum.status);
        if (datum.items?.length) {
          options.mergeCells.push(`A${i}:A${i + datum.items.length - 1}`);
          options.mergeCells.push(`B${i}:B${i + datum.items.length - 1}`);
          options.mergeCells.push(`C${i}:C${i + datum.items.length - 1}`);
          options.mergeCells.push(`J${i}:J${i + datum.items.length - 1}`);
          options.mergeCells.push(`K${i}:K${i + datum.items.length - 1}`);
          options.mergeCells.push(`L${i}:L${i + datum.items.length - 1}`);
          options.mergeCells.push(`M${i}:M${i + datum.items.length - 1}`);

          options.alignments.push({ [`A${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`B${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`C${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`J${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`K${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`L${i}`]: { horizontal: 'center', vertical: 'middle' } });
          options.alignments.push({ [`M${i}`]: { horizontal: 'center', vertical: 'middle' } });
          datum.items.forEach((item) => {
            i += 1;
            const method = stackingMethods.find((s) => s._id === item.stackingMethod);
            dataz.push([
              index + 1,
              datum.code,
              datum.customer?.fullName,
              item.categoryName,
              method?.name,
              item.unitPrice,
              item.quantity,
              item.palletDeposit,
              item.totalPrice,
              datum.totalAmount,
              datum.account?.fullName,
              moment(datum.createdAt).format('DD/MM/YYYY'),
              status?.name
            ]);
          });
        }
      });
    }
    res
      .status(200)
      .attachment('file.xlsx')
      .send(await convertToExcel(dataz, options));
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

import { uploadFileToFirebase } from '@lib/firebase';
import { createWarehouseReceiptValid, detailWarehouseReceiptValid, listWarehouseReceiptValid } from '@lib/validation';
import {
  countWarehouseReceiptMd,
  createStockMd,
  createWarehouseReceiptMd,
  deleteWarehouseReceiptMd,
  detailStockMd,
  detailWarehouseMd,
  detailWarehouseReceiptMd,
  listWarehouseReceiptMd,
  updateStockMd
} from '@models';
import { validateData } from '@utils';
import moment from 'moment';

export const getListWarehouseReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(listWarehouseReceiptValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, account, type, fromDate, toDate } = value;
    const where = {};
    if (keySearch) where.$or = [{ code: { $regex: keySearch, $options: 'i' } }];
    if (type) where.type = type;
    if (account) where.account = account;
    if (fromDate && toDate) {
      where.createdAt = {
        $gte: fromDate,
        $lte: toDate
      };
    }
    const documents = await listWarehouseReceiptMd(where, page, limit, [{ path: 'order', select: 'code' }]);
    const total = await countWarehouseReceiptMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteWarehouseReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(detailWarehouseReceiptValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailWarehouseReceiptMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu không tồn tại!' });
    res.status(201).json({ status: 1, data: await deleteWarehouseReceiptMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailWarehouseReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(detailWarehouseReceiptValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailWarehouseReceiptMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Phiếu không tồn tại!' });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const generateWHCode = async (type) => {
  const today = moment().format('YYYYMMDD');
  const prefix = type === 'import' ? `WHI-${today}` : `WHE-${today}`;
  const count = await countWarehouseReceiptMd({
    createdAt: {
      $gte: moment().startOf('day').toDate(),
      $lte: moment().endOf('day').toDate()
    }
  });
  const index = String(count + 1).padStart(4, '0');
  return `${prefix}-${index}`;
};

export const createWarehouseReceipt = async (req, res) => {
  try {
    const { error, value } = validateData(createWarehouseReceiptValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { type, items, warehouse } = value;
    const checkWarehouse = await detailWarehouseMd({ _id: warehouse });
    if (!checkWarehouse) return res.json({ status: 0, mess: 'Không tìm thấy kho hàng' });
    if (type === 'import') {
      for (const item of items) {
        const stock = await detailStockMd({ warehouse, category: item.category });
        if (!stock) await createStockMd({ warehouse, category: item.category, amount: item.amount });
        else await updateStockMd({ _id: stock._id }, { amount: stock.amount + item.amount });
      }
    } else {
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
    }
    const code = await generateWHCode(type);
    value.files = [];
    if (req.files?.['files']?.length > 0) {
      for (const file of req.files['files']) {
        value.files.push(await uploadFileToFirebase(file));
      }
    }
    const data = await createWarehouseReceiptMd({ code, account: req.account._id, ...value });
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

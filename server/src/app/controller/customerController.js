import {
  createCustomerValid,
  detailCustomerValid,
  listCustomerValid,
  listPriceByCustomerValid,
  updateCustomerValid
} from '@lib/validation';
import {
  countCustomerMd,
  createCustomerMd,
  createPriceMd,
  deleteCustomerMd,
  detailCustomerMd,
  listCategoryMd,
  listCustomerMd,
  listPriceMd,
  updateCustomerMd,
  updatePriceMd
} from '@models';
import { formatNumber, validateData } from '@utils';

export const getListCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(listCustomerValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { page, limit, keySearch, email } = value;
    const where = {};
    if (keySearch) where.$or = [{ fullName: { $regex: keySearch, $options: 'i' } }, { address: { $regex: keySearch, $options: 'i' } }];
    if (email) where.$or = [{ email: { $regex: email, $options: 'i' } }, { phone: { $regex: email, $options: 'i' } }];
    const documents = await listCustomerMd(where, page, limit);
    const total = await countCustomerMd(where);
    res.json({ status: 1, data: { documents, total } });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListCustomerInfo = async (req, res) => {
  try {
    res.json({ status: 1, data: await listCustomerMd({}) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(detailCustomerValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailCustomerMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Khách hàng không tồn tại!' });
    res.status(201).json({ status: 1, data: await deleteCustomerMd({ _id }) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const detailCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(detailCustomerValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id } = value;
    const data = await detailCustomerMd({ _id });
    if (!data) return res.json({ status: 0, mess: 'Khách hàng không tồn tại!' });
    const categories = await listCategoryMd();
    data.prices = await listPriceMd({ customer: _id, status: 1 });
    categories.forEach((c) => {
      const index = data.prices.findIndex((d) => String(d.category) === String(c._id));
      if (index >= 0) data.prices[index].name = c.name;
      else data.prices.push({ category: c._id, name: c.name });
    });
    res.json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

const getDescription = (priceBefore, priceAfter) => {
  if (!priceBefore) return `giá ${formatNumber(priceAfter)}`;
  else {
    if (priceBefore > priceAfter) return `giảm từ ${formatNumber(priceBefore)} xuống ${priceAfter}`;
    else return `tăng từ ${priceBefore} lên ${priceAfter}`;
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(updateCustomerValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, email, phone, prices } = value;
    const dataz = await detailCustomerMd({ _id });
    if (!dataz) return res.json({ status: 0, mess: 'Khách hàng không tồn tại!' });
    if (email) {
      const checkEmail = await detailCustomerMd({ email });
      if (checkEmail) return res.json({ status: 0, mess: 'Email đã được sử dụng!' });
    }
    if (phone) {
      const checkPhone = await detailCustomerMd({ phone });
      if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã được sử dụng!' });
    }
    const data = await updateCustomerMd({ _id }, { ...value });
    const key = Date.now();
    if (prices && Array.isArray(prices)) {
      for (const price of prices) {
        if (price.action === 'create') {
          await createPriceMd({
            customer: _id,
            category: price.category,
            price: price.price,
            key,
            description: getDescription(price.priceBefore, price.price),
            account: req.account._id
          });
        } else if (price.action === 'delete') {
          await updatePriceMd({ _id: price._id }, { status: 0 });
        }
      }
    }
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(createCustomerValid, req.body);
    if (error) return res.json({ status: 0, mess: error });
    const { email, phone, prices } = value;
    const checkEmail = await detailCustomerMd({ email });
    if (checkEmail) return res.json({ status: 0, mess: 'Email đã được sử dụng!' });
    const checkPhone = await detailCustomerMd({ phone });
    if (checkPhone) return res.json({ status: 0, mess: 'Số điện thoại đã được sử dụng!' });
    const data = await createCustomerMd({ ...value });
    const key = Date.now();
    if (prices && Array.isArray(prices)) {
      for (const price of prices) {
        await createPriceMd({
          customer: data._id,
          category: price.category,
          price: price.price,
          account: req.account._id,
          key,
          description: getDescription(false, price.price)
        });
      }
    }
    res.status(201).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListPriceByCustomer = async (req, res) => {
  try {
    const { error, value } = validateData(listPriceByCustomerValid, req.query);
    if (error) return res.json({ status: 0, mess: error });
    const { _id, status, page, limit } = value;
    const customer = await detailCustomerMd({ _id });
    if (!customer) return res.json({ status: 0, mess: 'Khách hàng không tồn tại!' });
    const where = { customer: _id };
    if (status) where.status = status;
    res.json({ status: 1, data: await listPriceMd(where, page, limit, [{ path: 'category', select: '_id name' }]) });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

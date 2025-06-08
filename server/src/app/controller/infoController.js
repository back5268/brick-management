import { getListBankVietQr } from '@lib/viet-qr';
import moment from 'moment';

export const getListBankInfo = async (req, res) => {
  try {
    res.status(200).json({ status: 1, data: await getListBankVietQr() });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

export const getListMonthInfo = async (req, res) => {
  try {
    const date = moment();
    const data = []
    const _id = date.format('YYYYMM');
    data.push({ _id: Number(_id), name: _id });
    for (let i = 0; i < 12; i++) {
      date.subtract(1, 'months');
      const _id = date.format('YYYYMM');
      data.push({ _id: Number(_id), name: _id });
    }
    res.status(200).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, mess: error.toString() });
  }
};

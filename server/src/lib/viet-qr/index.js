import { removeVietnameseTones } from '@utils';
import axios from 'axios';

export const generateVietQrLink = (amount, description, accountName = 'Mini Bdc') => {
  return `https://img.vietqr.io/image/MB-606606868-compact2.png?amount=${amount}&addInfo=${encodeURI(description)}&accountName=${encodeURI(removeVietnameseTones(accountName))}`;
};

export const getListBankVietQr = async () => {
  const apiBankUrl = 'https://api.vietqr.io/v2/banks';
  const { data, status } = await axios.get(apiBankUrl);
  let arrBank = [];
  if (status === 200) {
    data.data.forEach((bank) => {
      arrBank.push({ _id: bank.id, name: bank.name, short_url: bank.shortName, logo: bank.logo });
    });
  }
  return arrBank;
};

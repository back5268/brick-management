import { detailAccountMd } from '@models';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.header('Bearer');
  if (!token) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const account = await detailAccountMd({ _id: checkToken._id });
    if (!account) return res.status(401).json({ status: false, mess: 'Token không hợp lệ!' });
    if (account.token !== token) return res.status(401).json({ status: false, mess: 'Tài khoản đã được đăng nhập ở nơi khác!' });
    if (account.status === 0)
      return res.status(401).json({ status: false, mess: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!' });
    req.account = account;
    next();
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

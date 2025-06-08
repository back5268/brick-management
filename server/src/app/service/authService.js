import bcrypt from 'bcrypt';
import { confirmPasswordValid, sendOtpAuthValid, signInValid } from '@lib/validation';
import { detailAccountMd, updateAccountMd } from '@models';
import { generateNumber, validateData } from '@utils';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { sendMailForgotPassword } from './emailService';
dotenv.config();

export const signInService = async (req) => {
  const { error, value } = validateData(signInValid, req.body);
  if (error) throw new Error(error);
  const { username, password } = value;
  const checkUsername = await detailAccountMd({ $or: [{ phone: username }, { email: username }, { username }] });
  if (!checkUsername) throw new Error('Người dùng không tồn tại!');
  if (checkUsername.status === 0) throw new Error('Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!');
  if (!checkUsername.password) throw new Error('Mật khẩu không chính xác!');
  const passLogin = await bcrypt.compare(password, checkUsername.password);
  if (!passLogin) throw new Error('Mật khẩu không chính xác!');
  const token = jwt.sign({ _id: checkUsername._id }, process.env.JWT_SECRET_TOKEN);
  await updateAccountMd({ _id: checkUsername._id }, { token, lastLogin: new Date() });
  return token;
};

export const sendOtpForgotPasswordService = async (req) => {
  const { error, value } = validateData(sendOtpAuthValid, req.body);
  if (error) throw new Error(error);
  const { username } = value;
  const otp = generateNumber(6);
  const checkUser = await detailAccountMd({ $or: [{ phone: username }, { email: username }] });
  if (!checkUser) throw new Error('Không tìm thấy người dùng!');
  if (checkUser.status === 0) throw new Error('Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên!');
  const { status, mess } = await sendMailForgotPassword({ to: checkUser.email, username, otp });
  if (!status) throw new Error(mess);
  else {
    await updateAccountMd({ _id: checkUser._id }, { otp, timeSendOtp: new Date() });
    return checkUser.email;
  }
};

export const confirmPasswordService = async (req) => {
  const { error, value } = validateData(confirmPasswordValid, req.body);
  if (error) throw new Error(error);
  const { username, otp, password } = value;
  const checkUser = await detailAccountMd({ $or: [{ phone: username }, { email: username }] });
  if (!checkUser) throw new Error(`Không tìm thấy người dùng có tài khoản ${username}!`);
  if (String(checkUser.otp) !== String(otp) || new Date() - new Date(checkUser.timeSendOtp) > 5 * 60 * 1000)
    throw new Error('Mã xác nhận không đúng hoặc đã hết hạn!');
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  const data = await updateAccountMd({ _id: checkUser._id }, { password: newPassword, token: '', otp: '' });
  return data;
};

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { detailAccountMd } from '@models';
dotenv.config();

export const socketMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const checkToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const account = await detailAccountMd({ _id: checkToken._id });
    if (!account) {
      socket.disconnect();
      return;
    }
    next();
  } catch (error) {
    socket.disconnect();
  }
};

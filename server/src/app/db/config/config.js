import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDatabse = () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGODB_URI).then(() => console.log('DB connect successful!'));
  } catch (error) {
    console.log(error);
  }
};

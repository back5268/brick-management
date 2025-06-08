import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import socket from 'socket.io';
import session from 'express-session';

import { routes } from './routes';
import { connectDatabse } from '@config';
import { connectNodemailer } from '@lib/node-mailer';
import { socketMiddleware } from '@middleware';
import '@lib/node-cron';
import '@/test';
dotenv.config();

connectDatabse();
connectNodemailer();
const app = express();
const server = http.createServer(app);

export const ioSk = new socket.Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
ioSk.use(socketMiddleware);
ioSk.on('connection', () => console.log('Socket connect successful!'));

app.use(
  session({
    secret: process.env.SESSION_SECRET_TOKEN,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
routes(app);
app.use(express.static('src/public'));

server.listen(process.env.SERVER_HOST || 5000, () => console.log(`listening on port ${process.env.SERVER_HOST || 5000}`));

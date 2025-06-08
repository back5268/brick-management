// import dotenv from 'dotenv';
// import Redis from 'ioredis';

// dotenv.config();
// const username = process.env.REDIS_USERNAME || '';
// const password = process.env.REDIS_PASSWORD || '';
// const host = process.env.REDIS_HOST;
// const post = process.env.REDIS_PORT;

// export const redis = new Redis({
//   port: post,
//   host: host,
//   username,
//   password,
//   db: 0
// });

// export const connectRedis = () => {
//   redis.on('error', (err) => console.log(err));
//   redis.on('connect', () => console.log('Redis connect successful!'));
// };

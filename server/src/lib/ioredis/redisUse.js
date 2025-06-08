import { checkJson } from '@utils';
import { redis } from './config';

export const timeoutRedis = async (callBack) => {
  return new Promise(async (resolve, reject) => {
    const t = setTimeout(() => {
      reject('redis timeout');
    }, 10000);
    const value = await callBack();
    clearTimeout(t);
    resolve(value);
  }).catch((e) => {
    return throwErrorNo(e);
  });
};

export const reditSet = (key, value, EX = 30 * 24 * 60 * 60) => {
  return timeoutRedis(() => redis.set(key, value, 'EX', EX));
};

export const reditGet = (key) => {
  return timeoutRedis(() => redis.get(key));
};

export const reditDel = (key) => {
  return timeoutRedis(() => redis.del(key));
};

export const redisPushQueue = (key, value) => {
  return timeoutRedis(async () => {
    return redis.rpush(key, value);
  });
};

export const redisLPopQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.lpop(key);
  });
};

export const redisRPopQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.lpop(key);
  });
};

export const reditGetQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.lrange(key, 0, -1);
  });
};

export const reditCountQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.llen(key);
  });
};

export const reditDeleteQueue = (key) => {
  return timeoutRedis(async () => {
    return redis.ltrim(key, 0, -1);
  });
};

export class ArrayRedis {
  constructor(name) {
    this.name = name;
  }

  getLength() {
    return reditCountQueue(this.name);
  }

  async pop() {
    return redisLPopQueue(this.name);
  }

  async push(value, runOntime = false) {
    value = typeof value === 'object' ? JSON.stringify(value) : value;
    await redisPushQueue(this.name, value);
    if (runOntime) await this.runCronjob();
  }

  async runCronjob() {
    let length = await this.getLength();
    if (length <= 0) return;
    do {
      let data = await this.pop();
      data = checkJson(data) || data;
      length -= 1;
      try {
        await this.callbackCron(data);
      } catch (error) {
        console.log(error);
      }
    } while (length > 0);
  }

  async callbackCron() {}
}

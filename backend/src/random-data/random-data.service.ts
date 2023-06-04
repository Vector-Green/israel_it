import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RandomDataService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getDataByKey(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }

  async getAllKeyValuePairs(
    _start: number | undefined = 0,
    _limit: number | undefined,
  ) {
    const keys = await this.redis.keys('*');

    const start = Number.isInteger(_start) ? _start : 0;
    const end = _limit && Number.isInteger(_limit) ? _limit + start : undefined;

    const limitedKeys = keys.slice(start, end);

    const result = await Promise.all(
      limitedKeys.map(async (key) => {
        return { [key]: await this.getDataByKey(key) };
      }),
    );

    return await { count: keys.length, data: result };
  }

  async saveRandomData(key: string, value: string): Promise<string> {
    return await this.redis.set(key, value);
  }
}

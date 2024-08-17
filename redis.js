import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.connect();
  }

  async connect() {
    await this.client.connect()
      .then()
      .catch((err) => console.error(err));
  }

  async get(key) {
    return await this.client.get(key);
  }

  async set(key, value, duration) {
    await this.client.set(key, value, { EX: duration });
  }

  async del(key) {
    try {
      await this.client.del(key);
    } catch (err) {
      throw err;
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;

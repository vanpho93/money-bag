import url from 'url'
import redis from 'redis'
import { promisify } from 'util'
import { split } from 'lodash'

const {
  port,
  hostname,
  auth,
} = url.parse(process.env.REDIS_URL)

const redisClient = redis.createClient({
  port: Number(port),
  host: hostname,
  password: split(auth, ':')[1],
  tls: hostname === 'localhost' ? undefined : {
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
  },
})

export class Redis {
  static set(key: string, value: string, seconds = 0) {
    if (seconds === 0) return promisify(redisClient.set).bind(redisClient)(key, value)
    return promisify(redisClient.setex).bind(redisClient)(key, seconds, value)
  }

  static get(key: string) {
    return promisify(redisClient.get).bind(redisClient)(key)
  }

  static del(key: string) {
    return new Promise(resolve => redisClient.del(key, resolve))
  }

  static setJson<T>(key: string, value: T, expriredTime = 0) {
    return this.set(key, JSON.stringify(value), expriredTime)
  }

  static async getJson<T>(key: string): Promise<T> {
    const value = await this.get(key)
    return JSON.parse(value)
  }

  static async flushall() {
    return promisify(redisClient.flushall).bind(redisClient)()
  }
}

import Redis from "ioredis"

const redisClient = new Redis("rediss://default:c6fcb5d9e5764dd38651b21681ee73b8@us1-included-lark-38011.upstash.io:38011");

export default redisClient
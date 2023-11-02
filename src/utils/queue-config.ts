import BeeQueue from "bee-queue";
import redisClient from './redis'

const queue = new BeeQueue('process-file-queue', {
    redis: redisClient
});

export default queue
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
 
// // Create a new ratelimiter, that allows 10 requests per 10 seconds
// const ratelimit = new Ratelimit({
//   redis: new Redis({
//     url: process.env.REDIS_URL!,
//     token: process.env.REDIS_TOKEN!,
//   }),
//   limiter: Ratelimit.slidingWindow(10, "10 s"),
// });
 
// // Use a constant string to limit all requests with a single ratelimit
// // Or use a userID, apiKey or ip address for individual limits.
// const identifier = "api";
// const { success } = await ratelimit.limit(identifier);
 
// if (!success) {
//   return "Unable to process at this time";
// }
// doExpensiveCalculation();
// return "Here you go!";
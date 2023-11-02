import queue from "@/utils/queue-config";
import BeeQueue from "bee-queue";

async function process(job: BeeQueue.Job<any>){
    queue.process(async (job) => {
        console.log("Processing job", job.id);
        await new Promise((res) => setTimeout(res, 5000));
        console.log("Finished processing job", job.id);
    });
} 

export default process
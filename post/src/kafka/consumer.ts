import postController from "../controller/postController";
import kafka from "./config";
import { Consumer, Message } from "kafkajs";

async function consume(): Promise<void> {
    try {
        const consumer: Consumer = kafka.consumer({ groupId: "post-group" });
        await consumer.connect();
        await consumer.subscribe({
            topics: ["add-user", "delete-user"],
            fromBeginning: true,
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }: { topic: string; partition: number; message: Message }) => {
                console.log({
                    value: message.value?.toString(),
                });
                const value = JSON.parse(message.value?.toString() || "");
                if (topic === "add-user") {
                    await postController.addUser(value);
                }
            },
        });
    } catch (error) {
        console.log('kafka error');
        console.log(error);
    }
}

export default consume;

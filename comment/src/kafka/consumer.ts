import commentController from "../controller/commentController";

import kafka from "./config";
import { Consumer, EachMessagePayload } from "kafkajs";

async function consume(): Promise<void> {
    try {
        console.log("Starting Kafka consumer...");
        const consumer: Consumer = kafka.consumer({ groupId: "comment-group" });
        
        await consumer.connect();
        console.log("Connected to Kafka...");

        await consumer.subscribe({
            topics: ["add-post", "add-user", "delete-post"],
            fromBeginning: true
        })
        
        console.log('Subscribed to topics: add-post, add-user, delete-post');

        await consumer.run({
            eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
                console.log({
                    value: message.value?.toString(),
                });
                const value = JSON.parse(message.value?.toString() || "");

                if (topic === "add-post") {
                    await commentController.addPost(value);
                } else if (topic === "add-user") {
                    console.log("Processing add-user topic...", value);
                    await commentController.addUser(value);
                } else if (topic === 'delete-post') {
                    await commentController.deletePost(value);
                }
            },
        });
    } catch (error) {
        console.log('Kafka error');
        console.log(error);
    }
}


export default consume
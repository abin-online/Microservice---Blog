import kafka from "./config";
import { Consumer, Message } from "kafkajs";

const consumer: Consumer = kafka.consumer({ groupId: 'test-group' });

(async function () {
    try {
        await consumer.connect();
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }: { topic: string; partition: number; message: Message }) => {
                console.log({
                    value: message.value?.toString(),
                });
            },
        });
    } catch (error) {
        console.error('Error in Kafka consumer:', error);
    }
})();

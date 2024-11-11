import kafka from './config';
import { Partitioners, Producer } from 'kafkajs';

const producer: Producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

(async function () {
    try {
        await producer.connect();
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello KafkaJS user9525961!' },
            ],
        });
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        await producer.disconnect();
    }
})();
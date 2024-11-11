import kafka from "./config";
import { Partitioners } from "kafkajs";

async function produce(topic: string, value: string | Buffer): Promise<void> {
    try {
        console.log('Kafka succedeed')
        const producer = kafka.producer({createPartitioner : Partitioners.LegacyPartitioner}) 
        //LegacyPartitioner, which decides how messages are partitioned across Kafka's topics.
        await producer.connect()
        await producer.send({
            topic,
            messages: [{
                value
            }]
        })

        await producer.disconnect()
    } catch (error) {
        console.log(error);
    }
}

export default produce
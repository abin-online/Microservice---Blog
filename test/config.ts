import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "blog-app",
    brokers: ['localhost:9092', 'kafka2:9092'],
});

export default kafka;

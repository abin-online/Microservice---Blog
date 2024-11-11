import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "post-service",
    brokers: ['localhost:9092'],
});

export default kafka;

import dotenv from 'dotenv';
import amqp from 'amqplib';

var channel, connection;
const RABBIT_IP = `${process.env.RABBIT_IP}`;
const RABBIT_USER = `${process.env.RABBIT_USER}`;
const RABBIT_PASS = `${process.env.RABBIT_PASS}`;
const QUEUE = `${process.env.QUEUE}`;

connectQueue();

async function connectQueue() {
    try {
        connection = await amqp.connect(`amqp://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_IP}`);
        channel = await connection.createChannel();
        await channel.assertQueue(QUEUE);
        channel.consume(QUEUE, data => {
            channel.ack(data);

        })
    } catch (error) {
        console.log(error);
    }
};
import amqp from 'amqplib';
import dotenv from 'dotenv';

const QUEUE = `${process.env.QUEUE}`;
const RABBIT_IP = `${process.env.RABBIT_IP}`;
const RABBIT_USER = `${process.env.RABBIT_USER}`;
const RABBIT_PASS = `${process.env.RABBIT_PASS}`;
var channel, connection; 

async function connectQueue() {   
    try {
        connection = await amqp.connect(`amqp://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_IP}`);
        channel    = await connection.createChannel()
        await channel.assertQueue(QUEUE)
    } catch (error) {
        console.log(error)
    }
}

async function sendData(data) {
    const send = await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close(); 
    return send;
}

export {connectQueue, sendData};
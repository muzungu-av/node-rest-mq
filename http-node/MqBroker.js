const amqp = require("amqplib");

var channel, connection; 

async function connectQueue() {   
    try {
        connection = await amqp.connect("amqp://rabbitmq:rabbitmq@10.5.0.5");
        channel    = await connection.createChannel()
        await channel.assertQueue("muzungu-queue")
    } catch (error) {
        console.log(error)
    }
}

async function sendData(data) {
    const send = await channel.sendToQueue("muzungu-queue", Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close(); 
    return send;
}

module.exports = {connectQueue, sendData};
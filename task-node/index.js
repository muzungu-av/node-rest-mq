const amqp = require("amqplib");
var channel, connection;

connectQueue();
 
async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://rabbitmq:rabbitmq@10.5.0.5");
        channel = await connection.createChannel();
        
        await channel.assertQueue("muzungu-queue");
        
        channel.consume("muzungu-queue", data => {
            console.log(`${Buffer.from(data.content)}`);
            channel.ack(data);
        })
    } catch (error) {
        console.log(error);
    }
};
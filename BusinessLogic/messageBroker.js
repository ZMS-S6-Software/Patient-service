import {connect} from 'amqplib';

const connection = await connect('amqp://172.20.0.2');
const channel = await connection.createChannel();
const queue = 'message';

await channel.assertQueue(queue, { durable:false });


export default function () {
    async function sendDataToQueue(data) {
        try {
        channel.sendToQueue(queue, Buffer.from(data))
        } catch (error) {
          throw new Error("Error sending data");
        }
    }
  
    return {
        sendDataToQueue,
    };
}


// run in docker
// docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq
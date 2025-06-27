const amqp = require('amqplib');

const amqpURL = 'amqp://admin:admin@localhost:5672';

//  Queue에 쌓인 메시지 가져오기
const listenForMessages = async () => {

    //  MQ 연결하기
    const connection = await amqp.connect(amqpURL);
    const channel = await connection.createChannel();
    //  한번에 메시지 소비하는 갯수 설정
    await channel.prefetch(1);

    await consume({ connection, channel });
}

const consume = ({ connection, channel }) => {
    return new Promise((resolve, reject) => {
        //  MQ내 
        channel.consume('Q1', async (msg) => {

            const msgBody = msg.content.toString();
            const data = JSON.parse(msgBody);
            console.log('Received Data : ', data);
            //  메시지 처리 완료 알람
            await channel.ack(msg);
        })

        connection.on('close', (err) => {
            return reject(err);
        })

        connection.on('error', (err) => {
            return reject(err);
        })
    })
}

listenForMessages();
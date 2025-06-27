const amqp = require('amqplib');

const amqpURL = 'amqp://admin:admin@localhost:5672';

//  메시지 보내기
const sendMessage = async () => {
    //  MQ 연결하기
    const connection = await amqp.connect(amqpURL);
    const channel = await connection.createConfirmChannel();
    console.log('Publisher is connected to RabbitMQ');

    let counter = 1;

    //  테스트를 위해 3초에 한번씩 보내기
    await setInterval(() => {
        //  메시지 내용
        const msg = `hello ${counter++}`;

        // 메시지 체널 설정
        publishToChannel(channel, {
            exchangeName: 'E1',
            routingKey: 'RK1',
            data: { Message: msg },
        });

    }, 3000);
};

//  체널 설정
const publishToChannel = (channel, { routingKey, exchangeName, data }) => {
    return new Promise((resolve, reject) => {
        channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(data), 'utf-8'),     //  메시지
            { persistent: true },   //  디스크 저장
            (err, ok) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            }
        );
    });
};

sendMessage();
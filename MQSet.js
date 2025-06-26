const amqp = require('amqplib');

const MQ_URL = 'amqp://admin:admin@localhost:5672';

const script = async () => {
    const connection = await amqp.connect(MQ_URL)

    // 채널 생성
    const channel = await connection.createChannel()

    // exchange 생성
    await channel.assertExchange('E1', 'direct', { durable: true })

    // queue 생성
    await channel.assertQueue('Q1', { durable: true })

    // 바인딩
    //                       Queue, Exchange, Routing Key
    await channel.bindQueue('Q1', 'E1', 'RK1')

    process.exit()
}

script();

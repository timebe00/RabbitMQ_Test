# RabbitMQ_Test
RabbitMQ 학습하기

# MQ 실행 방법
docker-compose up -d

http://localhost:15672

# MQ 설정방법
1.
Exchanges > Add a new exchange
Name : E1
type : direct
Durabilty : Durable
Auto delete : No
Internal : No
Arguments : [빈칸] = [빈칸]

Add exchange 클릭

2.
Queues add Streams > Add a new queue
Virtual host: /
Type: Default for virtual host
Name: Q1
Durability: Durable
Arguments: [빈칸] = [빈칸]

Add queue 클릭

3.
Queues add Streams > testQ > Bindings
From exchange: testMQ
Routing key: RK1
Arguments: [빈칸] = [빈칸]

Bind 클릭

# Script 설정 방법
npm install amqplib
node MQSet.js



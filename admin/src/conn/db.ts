import { DataSource } from 'typeorm';
import { Product } from '../entity/product';
import amqplib from 'amqplib';
import dotenv from 'dotenv';
dotenv.config();


const amqpUrl: any = process.env.CLOUDAMQP_URL;

export const Db = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "MyDB",
    synchronize: true,
    logging: true,
    entities: [Product],
    subscribers: [],
    migrations: [],
})

let channel: amqplib.Channel


export const ConnectRabbit = async () => {
    try {
        const conn = await amqplib.connect(amqpUrl)
        channel = await conn.createChannel();
    } catch (ex) {
        console.error(`Error connicting to rabbit`)
    }
}


export { channel }
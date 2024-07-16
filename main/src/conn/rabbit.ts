import amqplib from 'amqplib';
import dotenv from 'dotenv';
import type { IProduct } from '../model/product';
import Product from '../model/product';
dotenv.config();

const amqpUrl: any = process.env.CLOUDAMQP_URL;

let channel: amqplib.Channel;

export const connectRabbit = async () => {
    try {
        const conn = await amqplib.connect(amqpUrl);
        channel = await conn.createChannel();
        channel.assertQueue('product_created', { durable: false });
        channel.assertQueue('product_updated', { durable: false });
        channel.assertQueue('product_deleted', { durable: false });
        await CreateProduct();
        await UpdateProduct();
        await DeletProduct();

    } catch (ex) {
        console.error(`Error connecting to RabbitMQ: ${ex}`);
    }
};

const CreateProduct = async () => {
    try {
        channel.consume('product_created', async (msg) => {
            if (msg && msg.content) {
                const eventProduct: IProduct = JSON.parse(msg.content.toString());
                await Product.create({
                    admin_id: parseInt(eventProduct.id),
                    title: eventProduct.title,
                    likes: eventProduct.likes,
                    image: eventProduct.image,
                });
                console.log('Product Saved!');
            } else {
                throw new Error('Message or message content is undefined.');
            }
        }, { noAck: true });
    } catch (ex) {
        console.error(`Error consuming product_created messages: ${ex}`);
    }
};


const UpdateProduct = async () => {
    try {
        channel.consume('product_updated', async (msg) => {
            if (msg && msg.content) {
                const eventProduct: IProduct = JSON.parse(msg.content.toString());
                const product = await Product.updateOne({ admin_id: eventProduct.id }, { $set: eventProduct }, { new: true });
                console.log('product updated', product);
            } else {
                throw new Error('Message or message content is undefined.');
            }
        }, { noAck: true });
    } catch (ex) {
        console.error(`Error consuming product_updated messages: ${ex}`);
    }
}


const DeletProduct = async () => {
    try {
        channel.consume('product_deleted', async (msg) => {
            if (msg && msg.content) {
                const id: number = parseInt(msg.content.toString());
                const product = await Product.deleteOne({ admin_id: id });
                console.log('product deleted!', product);
            } else {
                throw new Error('Message or message content is undefined.');
            }
        }, { noAck: true });
    } catch (ex) {
        console.error(`Error consuming product_deleted messages: ${ex}`);
    }
}

export { channel };

import mongoose from "mongoose";
import express, { type Express } from "express";
import cors from 'cors';
import { productRoutes } from "./src/route/product";
import dotenv from 'dotenv';
import { connectRabbit } from "./src/conn/rabbit";

dotenv.config();

const app: Express = express();
const PORT: number = 8080;
const dbUri: any = process.env.DB_URI;



app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);

async function run() {
   try {
      await mongoose.connect(dbUri)
      console.log('Connected to mongoDb');
      await connectRabbit()
      console.log('Connected to RabbitMQ');
      app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
   } catch (ex) {
      console.error(`Error connection to mongoDb ${ex}`)
   }
}

run();
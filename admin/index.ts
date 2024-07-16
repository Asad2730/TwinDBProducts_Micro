import express, { type Express } from 'express';
import cors from 'cors';
import { ConnectRabbit, Db } from './src/conn/db';
import { productRoutes } from './src/route/product';

const app: Express = express();
const PORT: number = 8000;


app.use(express.json())
app.use(cors())
app.use('/api/products', productRoutes);

const run = async () => {
  try {
    await Db.initialize();
    console.log('Database connected successfully');
    await ConnectRabbit()
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  } catch (ex) {
    console.error(`Error connecting to db ${ex}`);
  }
};


run();


import { DataSource } from 'typeorm';
import { Product } from '../entity/product';

export const Db = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Product],
    subscribers: [],
    migrations: [],
})


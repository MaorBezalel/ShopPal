import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';

const baseConfig: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DB_CONNECTION_URL,
    synchronize: false,
    entities: [],
    subscribers: [],
};

export const AppDataSource = new DataSource(baseConfig);

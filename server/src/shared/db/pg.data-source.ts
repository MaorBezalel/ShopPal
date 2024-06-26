import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Models from '../models';

const modelsList = Object.values(Models);

const baseConfig: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DB_CONNECTION_URL,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [...modelsList],
    subscribers: [],
};

export const AppDataSource = new DataSource(baseConfig);

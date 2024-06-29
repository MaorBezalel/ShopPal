import { DataSource } from 'typeorm';
import type { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Entities from '@/shared/models/entities';
import * as Relationships from '@/shared/models/relationships';

const entitiesList = Object.values(Entities);
const relationshipsList = Object.values(Relationships);

const baseConfig: DataSourceOptions = {
    type: 'postgres',
    url: process.env.DB_CONNECTION_URL,
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [...entitiesList, ...relationshipsList],
    subscribers: [],
};

export const AppDataSource = new DataSource(baseConfig);

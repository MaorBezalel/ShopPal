import express from 'express';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './shared/db/pg.data-source';

import { User, Product } from './shared/models';

// Simple ExpressJS Server For Testing
const app = express();
const PORT = 3000;

app.use(express.json());

//  !!!!!!!! npm run start:dev !!!!!!!!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    AppDataSource.initialize()
        .then(() => console.log('Database is up and running'))
        .then(async () => {
            const user = await AppDataSource.createQueryBuilder().select('user').from(User, 'user').getOne();

            console.log(user);
        })
        .catch((error) => console.log(`error starting database connection -> ${error.message}`));
});

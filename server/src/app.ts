import express from 'express';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from './shared/db/pg.data-source';

// Simple ExpressJS Server For Testing
const app = express();
const PORT = 3000;

app.use(express.json());

//  !!!!!!!! npm run start:dev !!!!!!!!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    AppDataSource.initialize()
        .then(() => console.log('Database is up and running'))
        .catch((error) => console.log(`error starting database connection -> ${error.message}`));
});

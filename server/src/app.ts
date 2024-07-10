import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from '@/shared/db/pg.data-source';
import UserRouter from '@/api/users/user.router'
import AuthRouter from '@/api/auth/auth.router';
import { errorMiddleware } from '@/middlewares/error.middleware';

const app = express();
const PORT = 3000;

app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true })); // DELETE AFTER (Client side port should be 5500 during development)
app.use(express.json());
app.use(cookieParser());
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use(errorMiddleware); // Every endpoint & middleware chain avaliable will eventually go to error middleware in case of exception thrown

//  !!!!!!!! npm run start:dev !!!!!!!!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    AppDataSource.initialize()
        .then(() => console.log('Database is up and running'))
        .catch((error) => console.log(`error starting database connection -> ${error.message}`));
});

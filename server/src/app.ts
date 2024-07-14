import express from 'express';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import * as dotenv from 'dotenv';
dotenv.config();

import { AppDataSource } from '@/shared/db/pg.data-source';
import UserRouter from '@/api/users/user.router';
import AuthRouter from '@/api/auth/auth.router';
import OrderRouter from '@/api/orders/order.router';
import CartRouter from '@/api/carts/carts.router';
import ReviewRouter from '@/api/reviews/review.router';
import ProductRouter from '@/api/products/product.router';
import { errorMiddleware } from '@/middlewares/error.middleware';
import corsMiddleware from './middlewares/cors.middleware';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API with Swagger',
            version: '1.0.0',
            description: 'A simple Express API',
        },
    },
    apis: ['src/api/**/*.router.ts'], // ['src/api/**/*.router.ts']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Express app setup:
const app = express();
const PORT = 3000;

// Middlewares (before routes):
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());

// Routes:
app.use('/user', UserRouter);
app.use('/auth', AuthRouter);
app.use('/order', OrderRouter);
app.use('/cart', CartRouter);
app.use('/review', ReviewRouter);
app.use('/product', ProductRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Middlewares (after routes):
app.use(errorMiddleware); // Every endpoint & middleware chain avaliable will eventually go to error middleware in case of exception thrown

//  !!!!!!!! npm run start:dev !!!!!!!!
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

    // Initialize database connection:
    AppDataSource.initialize()
        .then(() => console.log('Database is up and running'))
        .catch((error) => console.log(`error starting database connection -> ${error.message}`));
});

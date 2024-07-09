import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse } from '@/shared/types/utils.types';

import { HttpStatusCode } from '@/shared/types/httpcode.types';

import AppError from '@/shared/exceptions/app-error';

export const errorMiddleware = (error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    console.log('errorMiddleware -> error: ', error);

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            type: error.name,
            message: error.message,
            statusCode: error.statusCode,
        });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        type: 'Internal Server Error',
        message: 'Internal Server Error',
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
};

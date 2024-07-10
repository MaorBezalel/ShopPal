import type { Request, Response, NextFunction } from 'express';
import type { ErrorResponse } from '@/shared/types/utils.types';


import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';

import AppError from '@/shared/exceptions/app-error';
import { QueryFailedError } from 'typeorm';

export const errorMiddleware = (error: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            type: error.name,
            message: error.message,
            statusCode: error.statusCode,
        });
    }

    if (error instanceof QueryFailedError) 
        {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
            type: 'Query Failed Error',
            message: error.message,
            statusCode: HttpStatusCode.BAD_REQUEST,
        });
    
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        type: 'Internal Server Error',
        message: 'Internal Server Error',
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
};

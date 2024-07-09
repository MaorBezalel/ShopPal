import type { Request, Response, NextFunction } from 'express';

const tryCatchMiddleware = (controller: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        next(error);
    }
};

export default tryCatchMiddleware;

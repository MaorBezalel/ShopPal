import { validationResult, matchedData } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.body = matchedData(req);
        return next();
    } else {
        return res.status(400).json({ errors: errors.array({ onlyFirstError: true }) });
    }
};

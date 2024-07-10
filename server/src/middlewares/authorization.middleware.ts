// REQUEST ->> HEADER ->> Authorization 
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Request, Response, NextFunction} from 'express';
import { HttpStatusCode } from '@/shared/types/httpcode.types';

import { JWTHelper } from '@/shared/utils/helpers';

const authorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try 
    {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized'});
        }

       const decodedData = JWTHelper.verifyToken(accessToken!);
    
       next(); 
    }
    catch (error)
    {
        res.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized'});
    }
}

export default authorizationMiddleware;
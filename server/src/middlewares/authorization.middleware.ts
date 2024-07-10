// REQUEST ->> HEADER ->> Authorization 
import jwt, { JwtPayload } from 'jsonwebtoken';
import type {Request, Response, NextFunction} from 'express';
import type { RequestWithUserPayload } from '@/shared/types/utils.types';
import { HttpStatusCode } from '@/shared/types/httpcode.types';

const authorizationMiddleware = async (req: RequestWithUserPayload, res: Response, next: NextFunction) => {
    try 
    {
        const accessToken = req.headers.authorization?.split(' ')[1];

        if (!accessToken) {
            res.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized'});
        }

       const decodedData = jwt.verify(accessToken!, process.env.JWT_SECRET!) as JwtPayload;

       req.user_id = decodedData.user_id;
       req.email = decodedData.email;
       req.username = decodedData.username;
        
       next(); 
    }
    catch (error)
    {
        res.status(HttpStatusCode.UNAUTHORIZED).json({error: 'Unauthorized'});
    }
}

export default authorizationMiddleware;
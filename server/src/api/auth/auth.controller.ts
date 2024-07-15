import { Request, Response, NextFunction } from 'express';

import { JWTHelper } from '@/shared/utils/helpers';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import AppError from '@/shared/exceptions/app-error';
import jwt from 'jsonwebtoken';
import AuthService from '@/api/auth/auth.service';

class authController {
    public static async refreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.cookies) {
                const refreshToken = req.cookies[process.env.COOKIE_REFRESH_TOKEN_NAME!];
                const decodedData = JWTHelper.verifyToken(refreshToken) as jwt.JwtPayload;
                const newAccessToken = JWTHelper.signAccessToken({
                    user_id: decodedData.user_id,
                    email: decodedData.email,
                    username: decodedData.username,
                });

                const authorizedUser = await AuthService.getUserById(decodedData.user_id);

                return res.status(HttpStatusCode.OK).json({ accessToken: newAccessToken, user: authorizedUser });
            } else {
                throw new AppError('No refresh token found', HttpStatusCode.NOT_ACCEPTABLE, 'refresh-token');
            }
        } catch (error) {
            throw new AppError('No refresh token found', HttpStatusCode.NOT_ACCEPTABLE, 'refresh-token');
        }
    }
}

export default authController;

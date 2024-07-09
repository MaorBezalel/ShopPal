import { Request, Response, NextFunction, CookieOptions } from 'express';

import { HttpStatusCode } from '@/shared/types/httpcode.types';

import { User } from '@/shared/models/entities';
import { UserService } from './user.service';

import AppError from '@/shared/exceptions/app-error';

class UserController {
    public static async signup(req: Request, res: Response, next: NextFunction) {
        const isUserExist = await UserService.isUserAlreadyExist(req.body as User);

        if (isUserExist) {
            throw new AppError(
                'User already exists! Please try a different email or username',
                HttpStatusCode.CONFLICT,
                'createUser'
            );
        }

        const createdUser = await UserService.createUser(req.body as User);
        const accessToken = UserService.signAccessToken(createdUser);
        const refreshToken = UserService.signRefreshToken(createdUser);
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_AGE!),
        };
        UserController.createCookie(res, process.env.COOKIE_REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

        res.status(HttpStatusCode.CREATED).json({ accessToken: accessToken, user: createdUser });
    }

    public static async login(req: Request, res: Response, next: NextFunction) {
        const loginCredentials = req.body as Partial<User>;
        const loginCredentialsPassword = loginCredentials.password;
        const user = await UserService.getUser(loginCredentials);

        if (!user) {
            throw new AppError("User doesn't exist with current login details", HttpStatusCode.UNAUTHORIZED, 'getUser');
        }

        const isPasswordMatching = UserService.isPasswordMatching(user, loginCredentialsPassword!);

        if (!isPasswordMatching) {
            throw new AppError('User exists, but invalid credentials', HttpStatusCode.UNAUTHORIZED, 'passwordMatch');
        }

        const accessToken = UserService.signAccessToken(user);
        const refreshToken = UserService.signRefreshToken(user);
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_AGE!),
        };
        UserController.createCookie(res, process.env.COOKIE_REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

        res.status(HttpStatusCode.CREATED).json({ accessToken: accessToken, user: user });
    }

    private static createCookie<TValue>(
        res: Response,
        cookieName: string,
        cookieValue: TValue,
        cookieOptions: CookieOptions
    ) {
        res.cookie(cookieName, cookieValue, cookieOptions);
    }
}

export default UserController;

import { Request, Response, NextFunction, CookieOptions } from 'express';

import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';

import { JWTHelper } from '@/shared/utils/helpers';
import { User } from '@/shared/models/entities';
import { UserService } from './user.service';

class UserController {
    public static async signup(req: Request, res: Response, next: NextFunction) {
        await UserService.ensureUserExistence(req.body as User);
        const createdUser = await UserService.createUser(req.body as User);
        const accessToken = JWTHelper.signAccessToken(createdUser);
        const refreshToken = JWTHelper.signRefreshToken(createdUser);
        const cookieOptions = UserController.getSecuredHTTPOnlyCookieOptions();
        UserController.createCookie(res, process.env.COOKIE_REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

        res.status(HttpStatusCode.CREATED).json({ accessToken: accessToken, user: createdUser });
    }

    public static async login(req: Request, res: Response, next: NextFunction) {
        const loginCredentials = req.body as Partial<User>;
        const user = await UserService.getUser(loginCredentials);
        await UserService.ensurePasswordMatching(user, loginCredentials?.password!);
        const accessToken = JWTHelper.signAccessToken(user);
        const refreshToken = JWTHelper.signRefreshToken(user);
        const cookieOptions = UserController.getSecuredHTTPOnlyCookieOptions();
        UserController.createCookie(res, process.env.COOKIE_REFRESH_TOKEN_NAME!, refreshToken, cookieOptions);

        res.status(HttpStatusCode.CREATED).json({ accessToken: accessToken, user: user });
    }

    public static async logout(req: Request, res: Response, next: NextFunction) {
        UserController.clearCookie(res, process.env.COOKIE_REFRESH_TOKEN_NAME!);

        res.status(HttpStatusCode.OK).json({ message: 'User logged out successfully' });
    }

    public static async updateUser(req: Request, res: Response, next: NextFunction) {
        const updatedUserDetails = req.body as Partial<User>;
        await UserService.updateUser(updatedUserDetails, req.params.user_id);

        res.status(HttpStatusCode.CREATED).json({ user: updatedUserDetails });
    }

    public static async deleteUser(req: Request, res: Response, next: NextFunction) {
        await UserService.deleteUser(req.params.user_id);

        res.status(HttpStatusCode.OK).json({ message: 'User deleted successfully' });
    }

    private static createCookie<TValue>(
        res: Response,
        cookieName: string,
        cookieValue: TValue,
        cookieOptions: CookieOptions
    ) {
        res.cookie(cookieName, cookieValue, cookieOptions);
    }

    private static clearCookie(res: Response, cookieName: string) {
        res.clearCookie(cookieName);
    }

    private static getSecuredHTTPOnlyCookieOptions(): CookieOptions {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: parseInt(process.env.COOKIE_REFRESH_TOKEN_AGE!),
        };

        return cookieOptions;
    }
}

export default UserController;

import { User } from '@/shared/models/entities';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from '@/shared/types/utils.types';
import { UserRepository } from './user.repository';
import type { Nullable } from '@/shared/types/utils.types';

export class UserService {
    public static async getUser(partialUser: Partial<User>): Promise<Nullable<User>> {
        return !!partialUser.email
            ? await UserRepository.getUserByCredentials('email', partialUser.email)
            : await UserRepository.getUserByCredentials('username', partialUser.username!);
    }

    public static async createUser(user: User): Promise<User> {
        const result = await UserRepository.addUser(user);
        user.user_id = result.raw[0].user_id;
        return user;
    }

    public static async isUserAlreadyExist(user: User): Promise<boolean> {
        return UserRepository.isUserAlreadyExists(user);
    }

    public static isPasswordMatching(user: User, password: string) {
        return user.password === password;
    }

    public static signAccessToken(user: User): string {
        const tokenPayload: JwtPayload = {
            email: user.email,
            username: user.username,
            user_id: user.user_id,
        };

        return jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_ACCESS_TOKEN_LENGTH!,
        });
    }

    public static signRefreshToken(user: User): string {
        const tokenPayload: JwtPayload = {
            email: user.email,
            username: user.username,
            user_id: user.user_id,
        };

        return jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
            expiresIn: process.env.JWT_REFRESH_TOKEN_LENGTH!,
        });
    }
}

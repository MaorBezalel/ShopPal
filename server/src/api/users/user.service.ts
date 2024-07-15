import { User } from '@/shared/models/entities';
import { UserRepository } from './user.repository';
import bcrypt from 'bcryptjs';
import AppError from '@/shared/exceptions/app-error';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';

export class UserService {
    public static async getUser(partialUser: Partial<User>): Promise<User> {
        const user = (await !!partialUser.email)
            ? await UserRepository.getUserByCredentials('email', partialUser.email!)
            : await UserRepository.getUserByCredentials('username', partialUser.username!);

        if (!user) {
            throw new AppError("User doesn't exist with current login details", HttpStatusCode.NOT_FOUND, 'getUser');
        }

        return user;
    }

    public static async createUser(user: User): Promise<User> {
        user.password = await UserService.hashPassword(user.password);
        const result = await UserRepository.addUser(user);
        user.user_id = result.raw[0].user_id;
        return user;
    }

    public static async updateUser(updatedUserDetails: Partial<User>, userId: string): Promise<void> {
        if (updatedUserDetails.password) {
            updatedUserDetails.password = await UserService.hashPassword(updatedUserDetails.password);
        }

        const result = await UserRepository.updateUsersBy(updatedUserDetails, 'user_id', userId);

        if (result.affected === 0) {
            throw new AppError('Could not update user, user not found', HttpStatusCode.NOT_FOUND, 'updateUser');
        }
    }

    public static async deleteUser(userId: string): Promise<void> {
        const result = await UserRepository.deleteUser(userId);

        if (result.affected === 0) {
            throw new AppError('Could not delete user, user not found', HttpStatusCode.NOT_FOUND, 'deleteUser');
        }
    }

    public static async ensureUserExistence(user: User): Promise<void> {
        const isUserExist = await UserRepository.isUserAlreadyExists(user);

        if (isUserExist) {
            throw new AppError(
                'User already exists! Please try a different email or username',
                HttpStatusCode.CONFLICT,
                'createUser'
            );
        }
    }

    public static async ensurePasswordMatching(user: User, password: string): Promise<void> {
        const isPasswordMatching = await bcrypt.compare(password, user.password);

        if (!isPasswordMatching) {
            throw new AppError('User exists, but invalid credentials', HttpStatusCode.NOT_FOUND, 'passwordMatch');
        }
    }

    private static async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, parseInt(process.env.BCRYPT_HASH_LENGTH!));
    }
}

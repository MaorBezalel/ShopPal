import { User } from '@/shared/models/entities';
import AuthRepository from '@/api/auth/auth.repository';
import { HttpStatusCode } from '@/shared/types/enums/httpcode.types';
import AppError from '@/shared/exceptions/app-error';

class AuthService {
    public static async getUserById(user_id: string): Promise<User> {
        const user = await AuthRepository.getUserById(user_id);

        if (!user) {
            throw new AppError('Could not find authorized user', HttpStatusCode.NOT_FOUND, 'getUserById');
        }

        return user;
    }
}

export default AuthService;

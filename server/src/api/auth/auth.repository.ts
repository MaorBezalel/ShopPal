import { AppDataSource } from '@/shared/db/pg.data-source';
import { User } from '@/shared/models/entities';
import type { Nullable } from '@/shared/types/utils.types';

type AuthRepositoryType = {
    getUserById: (user_id: string) => Promise<Nullable<User>>;
};

const AuthRepository: AuthRepositoryType = AppDataSource.getRepository(User).extend({
    getUserById: (user_id: string) => {
        return AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where('user.user_id = :user_id', { user_id: user_id })
            .getOne();
    },
});

export default AuthRepository;

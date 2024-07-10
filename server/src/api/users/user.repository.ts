import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { AppDataSource } from '@/shared/db/pg.data-source';
import { User } from '@/shared/models/entities';
import { AtMostOneUndefined } from '@/shared/types/utils.types';

export type UserRepositoryType = {
    getAllUsers: () => Promise<User[]>;
    getUsersBy: <TKey extends keyof User>(key: TKey, value: User[TKey]) => Promise<User[]>;
    updateUsersBy<TKey extends keyof User>(user: User, key: TKey, value: User[TKey]): Promise<UpdateResult>;
    addUser: (user: User) => Promise<InsertResult>;
    deleteUser: (id: string) => Promise<DeleteResult>;
};

export const UserRepository = AppDataSource.getRepository(User).extend({
    getAllUsers: (): Promise<User[]> => {
        return AppDataSource.createQueryBuilder().select('user').from(User, 'user').getMany();
    },
    getUsersBy: <TKey extends keyof User>(key: TKey, value: User[TKey]) => {
        return AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where(`${key} = :value`, { value: value })
            .getMany();
    },
    updateUsersBy: <TKey extends keyof User>(user: Partial<User>, key: TKey, value: User[TKey]) => {
        return AppDataSource.createQueryBuilder()
            .update(User)
            .set(user)
            .where(`${key} = :value`, { value: value })
            .execute();
    },
    addUser: (user: User) => {
        return AppDataSource.createQueryBuilder().insert().into(User).values(user).execute();
    },
    deleteUser: (id: string) => {
        return AppDataSource.createQueryBuilder().delete().from(User).where('user_id = :id', { id: id }).execute();
    },
    isUserAlreadyExists: async (findBy: AtMostOneUndefined<Pick<User, 'email' | 'username'>>) => {
        if (!!findBy.email && !!findBy.username) {
            return await AppDataSource.createQueryBuilder()
                .select('user')
                .from(User, 'user')
                .where('user.email = :emailValue', { emailValue: findBy.email })
                .orWhere('user.username = :usernameValue', { usernameValue: findBy.username })
                .getCount()
                .then((count) => count > 0);
        } else if (!!findBy.email) {
            return AppDataSource.createQueryBuilder()
                .select('user')
                .from(User, 'user')
                .where('user.email = :emailValue', { emailValue: findBy.email })
                .getCount()
                .then((count) => count > 0);
        } else {
            return AppDataSource.createQueryBuilder()
                .select('user')
                .from(User, 'user')
                .where('user.username = :usernameValue', { usernameValue: findBy.username })
                .getCount()
                .then((count) => count > 0);
        }
    },
    getUserByCredentials<TCredential extends keyof Pick<User, 'email' | 'username'>>(
        credential: TCredential,
        value: User[TCredential]
    ) {
        return AppDataSource.createQueryBuilder()
            .select('user')
            .from(User, 'user')
            .where(`user.${credential} = :value`, { value: value })
            .getOne();
    },
});

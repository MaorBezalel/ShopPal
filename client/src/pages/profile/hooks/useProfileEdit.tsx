import { useAuth } from '@/shared/hooks';
import type { ProfileEditFormFields } from '../Profile.types';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/shared/types';
import { useRef, useCallback, useEffect, useState } from 'react';
import { useApi } from '@/shared/hooks';
import { useMessages } from '@/shared/hooks/useMessages.hook';

export const useProfileEdit = () => {
    const { auth, setAuth } = useAuth();
    const user = auth?.user;
    const { password, ...defaultFormValues } = user!;
    const { userApi } = useApi();
    const updatedUserData = useRef<User | null>(user!);
    const [isUserTriedToUpdateProfile, setIsUserTriedToUpdateProfile] = useState(false);
    const { displayMessage, clearMessage } = useMessages();

    const updateProfileQuery = async () => {
        setIsUserTriedToUpdateProfile(true);
        try {
            const updatedUser = await userApi.updateUser(updatedUserData.current!, user?.user_id!);
            return updatedUser;
        } catch (error) {
            throw new Error('Failed to update profile!');
        }
    };

    const { refetch, isFetching, isError, isSuccess } = useQuery({
        queryKey: ['profile', auth?.user?.user_id],
        queryFn: updateProfileQuery,
        enabled: false,
    });

    const onSubmit = useCallback(
        (data: ProfileEditFormFields) => {
            updatedUserData.current = { ...updatedUserData.current!, ...data } as User;
            refetch();
        },
        [refetch]
    );

    useEffect(() => {
        let msgid = null;
        if (isUserTriedToUpdateProfile && !isFetching && isError) {
            msgid = displayMessage({ message: 'Failed to update profile!', type: 'error' });
        }

        return () => {
            if (msgid) {
                clearMessage(msgid);
            }
        };
    }, [isError, isFetching, isUserTriedToUpdateProfile]);

    useEffect(() => {
        let msgid = null;

        if (isUserTriedToUpdateProfile && !isFetching && isSuccess) {
            msgid = displayMessage({ message: 'Profile updated successfully!', type: 'success' });
            setAuth((prev) => {
                return { ...prev!, user: updatedUserData.current! as User };
            });
        }

        return () => {
            if (msgid) {
                clearMessage(msgid);
            }
        };
    }, [isSuccess, isFetching, updatedUserData, isUserTriedToUpdateProfile]);

    return {
        defaultFormValues,
        onSubmit,
        isUpdating: isFetching,
    };
};

export default useProfileEdit;

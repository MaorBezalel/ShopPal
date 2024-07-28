import { useForm } from 'react-hook-form';
import ProfileEditSchema from '../schema/ProfileEditSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileBasicDetailsEdit } from './ProfileBasicDetailsEdit';
import { ProfileAdvancedDetailsEdit } from './ProfileAdvancedDetailsEdit';
import type { ProfileEditFormFields } from '../Profile.types';
import { FormProvider } from 'react-hook-form';
import useProfileEdit from '../hooks/useProfileEdit';

export const ProfileEdit = () => {
    const { defaultFormValues, onSubmit, isUpdating } = useProfileEdit();
    const methods = useForm<ProfileEditFormFields>({
        defaultValues: {
            ...defaultFormValues,
            password: '',
            confirmPassword: '',
            birthday: defaultFormValues.birthday?.toString() ?? null,
        },
        resolver: zodResolver(ProfileEditSchema),
    });

    return (
        <FormProvider {...methods}>
            <section>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex w-[60%] flex-col gap-3 p-4 pc-lg:w-[65%] pc-md:w-[70%] pc-sm:w-[80%] tablet-lg:w-[95%] tablet-md:w-full"
                >
                    <ProfileBasicDetailsEdit />
                    <ProfileAdvancedDetailsEdit />
                    <button
                        type="submit"
                        className="w-32 rounded-md bg-primary-200 px-6 py-2 text-lg font-semibold mobile-lg:w-full mobile-lg:py-1"
                        disabled={isUpdating}
                    >
                        {isUpdating ? 'Updating...' : 'Submit'}
                    </button>
                </form>
            </section>
        </FormProvider>
    );
};

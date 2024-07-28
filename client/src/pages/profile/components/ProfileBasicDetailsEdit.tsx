import { useFormContext } from 'react-hook-form';
import type { ProfileEditFormFields } from '../Profile.types';
import { InputField } from '@/shared/components/InputField.component';
import { InputFieldPassword } from '@/shared/components/InputFieldPassword.component';
import { IconEmail, IconUser, IconNameDetails } from '@/shared/components/icons';

export const ProfileBasicDetailsEdit = () => {
    const { register, formState } = useFormContext<ProfileEditFormFields>();

    const errors = formState.errors;

    return (
        <>
            <h1 className="my-2 text-2xl font-semibold">Basic Profile Details</h1>
            <div className="flex flex-col gap-2">
                <InputField
                    Icon={
                        <IconEmail
                            className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                            pc-sm:size-6
                            tablet-sm:size-5"
                        />
                    }
                    fieldName="email"
                    register={() => register('email')}
                    formState={formState}
                    placeholder='e.g. example@gmail.com"'
                />
            </div>
            <div className="flex flex-col gap-2">
                <InputField
                    Icon={
                        <IconUser className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500" />
                    }
                    fieldName="username"
                    register={() => register('username')}
                    formState={formState}
                    placeholder='e.g. "JohnDoe"'
                />
            </div>
            <div className="flex flex-col gap-2">
                <InputFieldPassword
                    fieldName="password"
                    register={() => register('password')}
                    formState={formState}
                    placeholder="e.g. @Example123"
                />
            </div>
            <div className="flex flex-col gap-2">
                <InputFieldPassword
                    fieldName="confirm password"
                    register={() => register('confirmPassword')}
                    InferError={() => errors.confirmPassword?.message as string}
                    formState={formState}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Name Details</h1>
                <div className="flex flex-row gap-4 pc-lg:flex-col pc-lg:gap-2">
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="first name"
                            register={() => register('name_details.first_name')}
                            placeholder='e.g. "John"'
                            InferError={() => errors.name_details?.first_name?.message as string}
                            formState={formState}
                        />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="middle name"
                            register={() => register('name_details.middle_name')}
                            InferError={() => errors.name_details?.middle_name?.message as string}
                            placeholder='e.g. "Johnson"'
                            formState={formState}
                        />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="last name"
                            register={() => register('name_details.last_name')}
                            InferError={() => errors.name_details?.last_name?.message as string}
                            placeholder='e.g. "Doe"'
                            formState={formState}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

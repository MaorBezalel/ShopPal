import { useFormContext } from 'react-hook-form';
import type { ProfileEditFormFields } from '../Profile.types';
import { InputField } from '@/shared/components/InputField.component';
import { InputFieldGender } from '@/shared/components/InputFieldGender.component';
import { IconCountry, IconCity, IconStreet, IconPhone, IconBirthday } from '@/shared/components/icons';
export const ProfileAdvancedDetailsEdit = () => {
    const { register, formState } = useFormContext<ProfileEditFormFields>();

    const errors = formState.errors;

    return (
        <>
            <h1 className="my-2 text-2xl font-semibold">Advanced Profile Details</h1>
            <div className="flex flex-col gap-2">
                <InputFieldGender
                    register={() => register('gender')}
                    formState={formState}
                />
            </div>
            <div className="flex flex-col gap-2">
                <InputField
                    Icon={
                        <IconPhone className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                    }
                    fieldName="phone"
                    register={() => register('phone')}
                    placeholder='e.g. "123-456-7890"'
                    InferError={() => errors.phone?.message as string}
                    formState={formState}
                />
            </div>
            <div className="flex flex-col gap-2">
                <InputField
                    Icon={
                        <IconBirthday className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                    }
                    className="pr-2"
                    fieldName="birthday"
                    type="date"
                    register={() => register('birthday')}
                    InferError={() => errors.birthday?.message as string}
                    formState={formState}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-xl font-semibold">Address</label>
                <div className="flex flex-row gap-4 pc-lg:flex-col pc-lg:gap-2">
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconStreet className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="street"
                            register={() => register('address.street')}
                            InferError={() => errors.address?.street?.message as string}
                            formState={formState}
                            placeholder='e.g. "1234 Main St"'
                        />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconCity className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="city"
                            register={() => register('address.city')}
                            InferError={() => errors.address?.city?.message as string}
                            formState={formState}
                            placeholder='e.g. "New York"'
                        />
                    </div>
                    <div className="flex flex-grow flex-col gap-2">
                        <InputField
                            Icon={
                                <IconCountry className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-5" />
                            }
                            fieldName="country"
                            register={() => register('address.country')}
                            InferError={() => errors.address?.country?.message as string}
                            formState={formState}
                            placeholder='e.g. "United States"'
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

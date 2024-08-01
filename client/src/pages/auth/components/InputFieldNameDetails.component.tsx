import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { SignupFormInputs } from '@/pages/auth/types';
import { IconNameDetails } from '@/shared/components/icons';

export function InputFieldNameDetails() {
    const {
        register,
        unregister,
        formState: { errors },
    } = useFormContext<SignupFormInputs>();

    const registerFirstName = () =>
        register('name_details.first_name', {
            required: 'First Name is required!',
            minLength: {
                value: 2,
                message: 'First Name must be at least 2 characters long!',
            },
            maxLength: {
                value: 32,
                message: 'First Name must be at most 32 characters long!',
            },
            pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'First Name should contain only letters!',
            },
        });

    const registerMiddleName = () =>
        register('name_details.middle_name', {
            minLength: {
                value: 2,
                message: 'Middle Name must be at least 2 characters long!',
            },
            maxLength: {
                value: 32,
                message: 'Middle Name must be at most 32 characters long!',
            },
            pattern: {
                value: /^[a-zA-Z]*$/,
                message: 'Middle Name should contain only letters!',
            },
        });

    const registerLastName = () =>
        register('name_details.last_name', {
            required: 'Last Name is required!',
            minLength: {
                value: 2,
                message: 'Last Name must be at least 2 characters long!',
            },
            maxLength: {
                value: 32,
                message: 'Last Name must be at most 32 characters long!',
            },
            pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'Last Name should contain only letters!',
            },
        });

    // unmount
    useEffect(() => {
        return () => {
            unregister('name_details.first_name');
            unregister('name_details.middle_name');
            unregister('name_details.last_name');
        };
    }, []);

    return (
        <section
            className="mobile-lg: flex w-full flex-row 
            gap-4 
            tablet-sm:gap-2 mobile-lg:flex-col"
        >
            <section
                className="flex w-1/3 flex-col gap-4 
                tablet-sm:gap-2
                mobile-lg:w-full"
            >
                <label
                    htmlFor="first_name"
                    className="text-xl
                    tablet-sm:text-lg"
                >
                    First Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500
                            pc-md:text-base
                            tablet-sm:px-9 tablet-sm:text-sm"
                            placeholder='e.g "John"'
                            aria-errormessage="error-first_name"
                            {...registerFirstName()}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />
                    </div>
                    <p
                        id="error-first_name"
                        className="text-sm text-red-600"
                    >
                        {(errors?.name_details?.first_name?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section
                className="flex w-1/3 flex-col gap-4 
                tablet-sm:gap-2
                mobile-lg:w-full"
            >
                <label
                    htmlFor="middle_name"
                    className="text-xl
                    tablet-sm:text-lg"
                >
                    Middle Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500
                            pc-md:text-base
                            tablet-sm:px-9 tablet-sm:text-sm"
                            placeholder='e.g. "Smith"'
                            aria-errormessage="error-middle_name"
                            {...registerMiddleName()}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />
                    </div>
                    <p
                        id="error-middle_name"
                        className="text-sm text-red-600"
                    >
                        {(errors?.name_details?.middle_name?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section
                className="flex w-1/3 flex-col gap-4 
                tablet-sm:gap-2
                mobile-lg:w-full"
            >
                <label
                    htmlFor="last_name"
                    className="text-xl
                    tablet-sm:text-lg"
                >
                    Last Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500
                            pc-md:text-base
                            tablet-sm:px-9 tablet-sm:text-sm"
                            placeholder='e.g. "Doe"'
                            aria-errormessage="error-last_name"
                            {...registerLastName()}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 tablet-sm:size-6" />
                    </div>
                    <p
                        id="error-last_name"
                        className="text-sm text-red-600"
                    >
                        {(errors?.name_details?.last_name?.message as string) || ''}
                    </p>
                </div>
            </section>
        </section>
    );
}

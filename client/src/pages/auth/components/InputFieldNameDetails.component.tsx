import { useFormContext } from 'react-hook-form';
import { SignupFormInputs } from '@/pages/auth/types';
import { IconNameDetails } from '@/shared/components/icons';

export function InputFieldNameDetails() {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignupFormInputs>();

    const registerFirstName = register('name_details.first_name', {
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

    const registerMiddleName = register('name_details.middle_name', {
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

    const registerLastName = register('name_details.last_name', {
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

    return (
        <section className="flex w-full flex-row gap-4">
            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="first_name" className="text-xl">
                    First Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500"
                            placeholder='e.g "John"'
                            aria-errormessage="error-first_name"
                            {...registerFirstName}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500" />
                    </div>
                    <p id="error-first_name" className="text-sm text-red-600">
                        {(errors?.name_details?.first_name?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="middle_name" className="text-xl">
                    Middle Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500"
                            placeholder='e.g. "Smith"'
                            aria-errormessage="error-middle_name"
                            {...registerMiddleName}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500" />
                    </div>
                    <p id="error-middle_name" className="text-sm text-red-600">
                        {(errors?.name_details?.middle_name?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="last_name" className="text-xl">
                    Last Name
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500"
                            placeholder='e.g. "Doe"'
                            aria-errormessage="error-last_name"
                            {...registerLastName}
                        />
                        <IconNameDetails className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500" />
                    </div>
                    <p id="error-last_name" className="text-sm text-red-600">
                        {(errors?.name_details?.last_name?.message as string) || ''}
                    </p>
                </div>
            </section>
        </section>
    );
}

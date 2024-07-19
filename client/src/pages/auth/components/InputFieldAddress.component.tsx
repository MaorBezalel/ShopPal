import { useFormContext } from 'react-hook-form';
import { SignupFormInputs } from '@/pages/auth/types';
import { IconCountry, IconCity, IconStreet } from '@/shared/components/icons';

export function InputFieldAddress() {
    const {
        register,
        formState: { errors },
    } = useFormContext<SignupFormInputs>();

    const registerCountry = register('address.country', {
        required: 'Country is required!',
        minLength: {
            value: 2,
            message: 'Country must be at least 2 characters long!',
        },
        maxLength: {
            value: 16,
            message: 'Country must be at most 16 characters long!',
        },
        pattern: {
            value: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
            message: 'Country can only contain letters, dashes, and spaces (no successive spaces or dashes)!',
        },
    });

    const registerCity = register('address.city', {
        required: 'City is required!',
        minLength: {
            value: 2,
            message: 'City must be at least 2 characters long!',
        },
        maxLength: {
            value: 16,
            message: 'City must be at most 32 characters long!',
        },
        pattern: {
            value: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
            message: 'City can only contain letters, dashes, and spaces (no successive spaces or dashes)!',
        },
    });

    const registerStreet = register('address.street', {
        required: 'Street is required!',
        minLength: {
            value: 2,
            message: 'Street must be at least 2 characters long!',
        },
        maxLength: {
            value: 32,
            message: 'Street must be at most 32 characters long!',
        },
        pattern: {
            value: /^[A-Za-z0-9]+(?:[-\s][A-Za-z0-9]+)*$/,
            message: 'Street can only contain letters, numbers, dashes, and spaces (no successive spaces or dashes)!',
        },
    });

    return (
        <section className="flex w-full flex-row gap-4">
            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="country" className="text-xl">
                    Country
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                            placeholder='e.g. "England"'
                            aria-errormessage="error-country"
                            {...registerCountry}
                        />
                        <IconCountry className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                    </div>
                    <p id="error-country" className="text-sm text-red-600">
                        {(errors?.address?.country?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="city" className="text-xl">
                    City
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                            placeholder='e.g. "London"'
                            aria-errormessage="error-city"
                            {...registerCity}
                        />
                        <IconCity className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                    </div>
                    <p id="error-city" className="text-sm text-red-600">
                        {(errors?.address?.city?.message as string) || ''}
                    </p>
                </div>
            </section>

            <section className="flex w-1/3 flex-col gap-4">
                <label htmlFor="street" className="text-xl">
                    Street
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type="text"
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                            placeholder='e.g. "Wall Street"'
                            aria-errormessage="error-street"
                            {...registerStreet}
                        />
                        <IconStreet className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                    </div>
                    <p id="error-street" className="text-sm text-red-600">
                        {(errors?.address?.street?.message as string) || ''}
                    </p>
                </div>
            </section>
        </section>
    );
}

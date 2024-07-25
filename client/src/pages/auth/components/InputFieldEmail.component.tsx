import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { IconEmail } from '@/shared/components/icons';

export function InputFieldEmail() {
    const {
        register,
        unregister,
        formState: { errors },
    } = useFormContext();

    const registerEmail = () =>
        register('email', {
            required: 'Email is required!',
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                message: 'Invalid email address!',
            },
        });

    // unmount
    useEffect(() => {
        return () => {
            unregister('email');
        };
    }, []);

    return (
        <section
            className="flex w-full flex-col gap-4
            tablet-sm:gap-2"
        >
            <label
                htmlFor="email"
                className="text-xl
                tablet-sm:text-lg"
            >
                Email
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder='e.g. "JohnDoe@email.com"'
                        aria-errormessage="error-email"
                        {...registerEmail()}
                        className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 
                        pc-md:text-base
                        pc-sm:px-9
                        tablet-sm:px-8 tablet-sm:text-sm"
                    />
                    <IconEmail
                        className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                        pc-sm:size-6
                        tablet-sm:size-5"
                    />
                </div>
                <p
                    id="error-email"
                    className="text-sm text-red-600"
                >
                    {(errors?.email?.message as string) || ''}
                </p>
            </div>
        </section>
    );
}

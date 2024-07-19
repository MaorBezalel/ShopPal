import { useFormContext } from 'react-hook-form';
import { IconEmail, IconUser } from '@/shared/components/icons';

export function InputFieldEmailOrUsername() {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext();
    const watchEmailOrUsername = watch('emailOrUsername', '');

    const registerEmailOrUsername = register('emailOrUsername', {
        required: 'Email or Username is required!',
        validate: {
            pattern: (value) => {
                const stringValue = value as string;
                const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                const usernamePattern = /^[a-zA-Z0-9_]+$/;
                if (stringValue.includes('@')) {
                    return emailPattern.test(stringValue) || 'Email should be in the format "example@example.com"';
                } else {
                    return (
                        usernamePattern.test(stringValue) ||
                        'Username should contain only letters, numbers and underscores'
                    );
                }
            },
            minLength: (value) => {
                const stringValue = value as string;
                if (stringValue.includes('@')) {
                    return true; // email min length is not checked
                } else {
                    return stringValue.length >= 3 || 'Username must be at least 3 characters long!';
                }
            },
            maxLength: (value) => {
                const stringValue = value as string;
                if (stringValue.includes('@')) {
                    return true; // email max length is not checked
                } else {
                    return stringValue.length <= 32 || 'Username must be at most 32 characters long!';
                }
            },
        },
    });

    return (
        <section className="flex w-full flex-col gap-4">
            <label htmlFor="emailOrUsername" className="text-xl">
                Email or Username
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                        placeholder='e.g. "JohnDoe@email.com" or "JohnDoe"'
                        aria-errormessage="error-emailOrUsername"
                        {...registerEmailOrUsername}
                    />
                    {(watchEmailOrUsername as string).includes('@') ? (
                        <IconEmail className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                    ) : (
                        <IconUser className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                    )}
                </div>
                <p id="error-emailOrUsername" className="text-sm text-red-600">
                    {(errors?.emailOrUsername?.message as string) || ''}
                </p>
            </div>
        </section>
    );
}

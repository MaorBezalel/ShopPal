import { useFormContext } from 'react-hook-form';
import { IconUser } from '@/shared/components/icons';

export function InputFieldUsername() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const registerUsername = register('username', {
        required: 'Username is required!',
        minLength: { value: 3, message: 'Username must be at least 3 characters long!' },
        maxLength: { value: 32, message: 'Username must be at most 32 characters long!' },
        pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Username should contain only letters, numbers and underscores',
        },
    });

    return (
        <section
            className="flex w-full flex-col gap-4
            tablet-sm:gap-2"
        >
            <label
                htmlFor="username"
                className="text-xl
                tablet-sm:text-lg"
            >
                Username
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 
                        pc-md:text-base
                        pc-sm:px-9 pc-sm:text-base
                        tablet-sm:px-8 tablet-sm:text-sm"
                        placeholder='e.g. "JohnDoe"'
                        aria-errormessage="error-username"
                        autoComplete="username"
                        {...registerUsername}
                    />
                    <IconUser
                        className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                        pc-sm:size-6
                        tablet-sm:size-5"
                    />
                </div>
                <p
                    id="error-username"
                    className="text-sm text-red-600"
                >
                    {(errors?.username?.message as string) || ''}
                </p>
            </div>
        </section>
    );
}

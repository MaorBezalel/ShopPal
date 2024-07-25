import { useFormContext } from 'react-hook-form';
import { IconUser } from '@/shared/components/icons';
import { useEffect } from 'react';
import { InputField } from '@/shared/components/InputField.component';

export function InputFieldUsername() {
    const { register, unregister, formState } = useFormContext();

    const registerUsername = () =>
        register('username', {
            required: 'Username is required!',
            minLength: { value: 3, message: 'Username must be at least 3 characters long!' },
            maxLength: { value: 32, message: 'Username must be at most 32 characters long!' },
            pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username should contain only letters, numbers and underscores',
            },
        });

    useEffect(() => {
        return () => {
            unregister('username');
        };
    }, []);

    return (
        <section
            className="flex w-full flex-col gap-4
            tablet-sm:gap-2"
        >
            <InputField
                className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 
                        pc-md:text-base
                        pc-sm:px-9 pc-sm:text-base
                        tablet-sm:px-8 tablet-sm:text-sm"
                register={registerUsername}
                formState={formState}
                fieldName="username"
                placeholder='e.g. "JohnDoe"'
                aria-errormessage="error-username"
                autoComplete="username"
                Icon={
                    <IconUser
                        className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                pc-sm:size-6
                tablet-sm:size-5"
                    />
                }
            />
        </section>
    );
}

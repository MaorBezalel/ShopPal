import { useFormContext } from 'react-hook-form';
import { IconEmail } from '@/shared/components/icons';

export function InputFieldEmail() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const registerEmail = register('email', {
        required: 'Email is required!',
        pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            message: 'Invalid email address!',
        },
    });

    return (
        <section className="flex w-full flex-col gap-4">
            <label
                htmlFor="email"
                className="text-xl"
            >
                Email
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        type="text"
                        className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                        placeholder='e.g. "JohnDoe@email.com"'
                        aria-errormessage="error-email"
                        {...registerEmail}
                    />
                    <IconEmail className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
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

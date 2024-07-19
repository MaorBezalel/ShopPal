import { useFormContext, FieldError } from 'react-hook-form';
import useFlag from '@/shared/hooks/useFlag.hook';
import { IconPassword, IconPasswordEye } from '@/shared/components/icons';

type InputFieldPasswordProps = {
    isSignup?: boolean;
};

export function InputFieldPassword({ isSignup }: InputFieldPasswordProps): JSX.Element {
    const {
        register,
        formState: { errors },
    } = useFormContext();
    const { value: showPassword, toggle: toggleShowPassword } = useFlag(false);
    const { value: showConfirmPassword, toggle: toggleShowConfirmPassword } = useFlag(false);

    const registerPassword = register('password', {
        required: 'Password is required!',
        minLength: { value: 8, message: 'Password must be at least 8 characters long!' },
        maxLength: { value: 32, message: 'Password must be at most 32 characters long!' },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
            message: 'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
        },
    });

    const registerConfirmPassword = register('confirmPassword', {
        required: 'Confirm Password is required!',
        validate: (value, { password }) => {
            return value === password || 'Passwords do not match!';
        },
    });

    return (
        <section className="flex w-full flex-row gap-10">
            <section className={`flex flex-col gap-4 ${isSignup ? 'w-1/2' : 'w-full'}`}>
                <label htmlFor="password" className="text-xl">
                    Password
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                            placeholder="Password..."
                            aria-errormessage="error-password"
                            {...registerPassword}
                        />
                        <IconPassword className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                        <IconPasswordEye
                            className="absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950 peer-focus:text-accent-500 pc-sm:size-6"
                            closed={!showPassword}
                            onClick={toggleShowPassword}
                        />
                    </div>
                    <p id="error-password" className="text-sm text-red-600">
                        {(errors?.password?.message as string) || ''}
                    </p>
                </div>
            </section>

            {isSignup && (
                <section className="flex w-1/2 flex-col gap-4">
                    <label htmlFor="confirmPassword" className="text-xl">
                        Confirm Password
                    </label>
                    <div className="flex w-full flex-col gap-2">
                        <div className="relative w-full">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-sm:px-9 pc-sm:text-base"
                                placeholder="Confirm Password..."
                                aria-errormessage="error-confirmPassword"
                                {...registerConfirmPassword}
                            />
                            <IconPassword className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6" />
                            <IconPasswordEye
                                className="absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950 peer-focus:text-accent-500 pc-sm:size-6"
                                closed={!showConfirmPassword}
                                onClick={toggleShowConfirmPassword}
                            />
                        </div>
                        <p id="error-confirmPassword" className="text-sm text-red-600">
                            {(errors?.confirmPassword?.message as string) || ''}
                        </p>
                    </div>
                </section>
            )}
        </section>
    );
}

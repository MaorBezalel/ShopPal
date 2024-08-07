import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import useFlag from '@/shared/hooks/useFlag.hook';
import { IconPassword, IconPasswordEye } from '@/shared/components/icons';

type InputFieldPasswordProps = {
    isSignup?: boolean;
};

export function InputFieldPassword({ isSignup }: InputFieldPasswordProps): JSX.Element {
    const {
        register,
        unregister,
        formState: { errors },
    } = useFormContext();
    const { value: showPassword, toggle: toggleShowPassword } = useFlag(false);

    const registerPassword = () =>
        register('password', {
            required: 'Password is required!',
            minLength: { value: 8, message: 'Password must be at least 8 characters long!' },
            maxLength: { value: 32, message: 'Password must be at most 32 characters long!' },
            pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                message:
                    'Password should contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
            },
        });

    // unmount
    useEffect(() => {
        return () => {
            unregister('password');
            unregister('confirmPassword');
        };
    }, []);

    return (
        <section
            className={`flex w-full flex-row gap-10
            ${isSignup ? 'tablet-sm:gap-4' : ''}
            ${isSignup ? 'mobile-lg:flex-col mobile-lg:gap-2' : ''}`}
        >
            <section
                className={`flex flex-col gap-4 ${isSignup ? 'w-1/2' : 'w-full'} 
                ${isSignup ? 'tablet-sm:gap-2' : ''}
                ${isSignup ? 'mobile-lg:w-full' : ''}
                ${isSignup ? '' : 'mobile-md:gap-2'}`}
            >
                <label
                    htmlFor="password"
                    className={`text-xl
                    ${isSignup ? 'tablet-sm:text-lg' : ''}
                    ${isSignup ? '' : 'mobile-md:text-lg'}`}
                >
                    Password
                </label>
                <div className="flex w-full flex-col gap-2">
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className={`peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 
                            pc-md:text-base
                            pc-sm:px-9 pc-sm:text-base
                            ${isSignup ? 'tablet-sm:px-8 tablet-sm:text-sm' : ''}
                            ${isSignup ? '' : 'mobile-md:px-7 mobile-md:text-sm'}`}
                            placeholder="Password..."
                            aria-errormessage="error-password"
                            autoComplete="new-password"
                            {...registerPassword()}
                        />
                        <IconPassword
                            className={`absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                            pc-sm:size-6
                            ${isSignup ? 'tablet-sm:size-5' : ''}
                            ${isSignup ? '' : 'mobile-md:size-5'}`}
                        />
                        <IconPasswordEye
                            closed={!showPassword}
                            onClick={toggleShowPassword}
                            className={`absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950 peer-focus:text-accent-500 
                            pc-sm:size-6
                            ${isSignup ? 'tablet-sm:size-5' : ''}`}
                        />
                    </div>
                    <p
                        id="error-password"
                        className="text-sm text-red-600"
                    >
                        {(errors?.password?.message as string) || ''}
                    </p>
                </div>
            </section>

            {isSignup && <InputFieldConfirmPassword />}
        </section>
    );
}

export function InputFieldConfirmPassword(): JSX.Element {
    const {
        register,
        unregister,
        formState: { errors },
    } = useFormContext();
    const { value: showConfirmPassword, toggle: toggleShowConfirmPassword } = useFlag(false);

    const registerConfirmPassword = () =>
        register('confirmPassword', {
            required: 'Confirm Password is required!',
            validate: (value, { password }) => {
                return value === password || 'Passwords do not match!';
            },
        });

    // unmount
    useEffect(() => {
        return () => {
            unregister('confirmPassword');
        };
    }, []);

    return (
        <section
            className="flex w-1/2 flex-col gap-4
                    tablet-sm:gap-2
                    mobile-lg:w-full"
        >
            <label
                htmlFor="confirmPassword"
                className="text-xl
                        tablet-sm:text-lg"
            >
                Confirm Password
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500
                                pc-md:text-base
                                pc-sm:px-9 pc-sm:text-base
                                tablet-sm:px-8 tablet-sm:text-sm"
                        placeholder="Confirm Password..."
                        aria-errormessage="error-confirmPassword"
                        {...registerConfirmPassword()}
                    />
                    <IconPassword
                        className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                                pc-sm:size-6
                                tablet-sm:size-5"
                    />
                    <IconPasswordEye
                        className="absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950 peer-focus:text-accent-500 
                                pc-sm:size-6
                                tablet-sm:size-5"
                        closed={!showConfirmPassword}
                        onClick={toggleShowConfirmPassword}
                    />
                </div>
                <p
                    id="error-confirmPassword"
                    className="text-sm text-red-600"
                >
                    {(errors?.confirmPassword?.message as string) || ''}
                </p>
            </div>
        </section>
    );
}

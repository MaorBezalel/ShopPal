import { Link } from 'react-router-dom';
import authBannerSVG from '@/assets/svgs/auth-banner.svg';
import { IconLogin, IconSignup } from '@/shared/components/icons';
import {
    AuthForm,
    InputFieldNameDetails,
    InputFieldEmailOrUsername,
    InputFieldPassword,
    InputFieldRememberMe,
    InputFieldEmail,
    InputFieldUsername,
    InputFieldGender,
    InputFieldAddress,
    AuthHeader,
} from '@/pages/auth/components';

type AuthPageProps = {
    type: 'login' | 'signup';
};

export function AuthPage({ type }: AuthPageProps) {
    return (
        <main className="container-highlight tt-md:items-start container mx-auto flex flex-1 flex-row items-center justify-between gap-4 text-text-950 tablet-lg:flex-col-reverse tablet-lg:items-start tablet-lg:justify-normal tablet-md:flex-col-reverse tablet-md:justify-normal">
            <section className="relative z-10 flex w-1/2 flex-col justify-start gap-4 pl-2 tablet-lg:w-full tablet-lg:gap-2 tablet-lg:pl-0 tablet-md:w-full tablet-md:gap-2 tablet-md:pl-0">
                <AuthHeader type={type} />
                {type === 'login' ? (
                    <AuthForm formType={type}>
                        <InputFieldEmailOrUsername />
                        <InputFieldPassword isSignup={false} />
                        <InputFieldRememberMe />
                        <button
                            type="submit"
                            className="mt-2 flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-3 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700 tablet-lg:mb-10 tablet-lg:self-center tablet-md:mb-10 tablet-md:self-center"
                        >
                            <span>Login</span>
                            <IconLogin />
                        </button>
                    </AuthForm>
                ) : type === 'signup' ? (
                    <AuthForm formType={type}>
                        <InputFieldNameDetails />
                        <section className="flex w-full flex-row items-center gap-10">
                            <InputFieldEmail />
                            <InputFieldUsername />
                        </section>
                        <InputFieldPassword isSignup={true} />
                        <InputFieldAddress />
                        <InputFieldGender />
                        <button
                            type="submit"
                            className="mt-2 flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-3 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700 tablet-lg:mb-10 tablet-lg:self-center tablet-md:mb-10 tablet-md:self-center"
                        >
                            <span>Sign Up</span>
                            <IconSignup />
                        </button>
                    </AuthForm>
                ) : (
                    <p>404 page</p>
                )}
            </section>
            <img
                src={authBannerSVG}
                alt="auth banner"
                draggable={false}
                className="relative z-0 h-[50rem] w-1/2 tablet-lg:h-[20rem] tablet-lg:w-full tablet-lg:translate-y-2 tablet-lg:scale-150 tablet-md:h-[20rem] tablet-md:w-full tablet-md:translate-y-2 tablet-md:scale-150"
            />
        </main>
    );
}

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
        <main
            className="container-highlight container flex flex-1 flex-row items-center justify-between gap-4 text-text-950 
            pc-sm:flex-col-reverse pc-sm:items-center pc-sm:justify-normal
            tablet-md:flex-col-reverse tablet-md:items-start tablet-md:justify-normal"
        >
            <section
                className={`relative z-10 flex w-1/2 flex-col justify-start gap-4 pl-2 
                pc-sm:w-full pc-sm:gap-2 pc-sm:pl-0 ${type === 'login' ? 'pc-sm:-translate-y-12' : 'pc-sm:translate-y-4'}
                tablet-md:w-full tablet-md:gap-2 tablet-md:pl-0`}
            >
                <AuthHeader type={type} />
                {type === 'login' ? (
                    <AuthForm
                        formType={type}
                        className="mt-2 flex w-full flex-col items-start gap-2
                        pc-sm:px-14
                        mobile-lg:px-6
                        mobile-md:px-3"
                    >
                        <LoginFields />
                    </AuthForm>
                ) : type === 'signup' ? (
                    <AuthForm
                        formType={type}
                        className="mt-2 flex w-full flex-col items-start gap-2
                        pc-sm:gap-2 pc-sm:px-4
                        tablet-sm:px-2"
                    >
                        <SignupFields />
                    </AuthForm>
                ) : (
                    <p>404 page</p>
                )}
            </section>
            <img
                src={authBannerSVG}
                alt="auth banner"
                draggable={false}
                className={`relative z-0 h-[50rem] w-1/2 
                pc-sm:h-[20rem] pc-sm:w-full pc-sm:scale-150 ${type === 'login' ? 'pc-sm:-translate-y-16' : 'pc-sm:translate-y-2'}
                tablet-md:h-[20rem] tablet-md:w-full tablet-md:scale-150
                ${type === 'login' ? 'tablet-md:-translate-y-12' : ''}
                ${type === 'login' ? 'tablet-sm:-translate-y-10' : ''} tablet-sm:scale-[1.4]
                mobile-lg:scale-125
                mobile-md:scale-100`}
            />
        </main>
    );
}

function LoginFields() {
    return (
        <>
            <InputFieldEmailOrUsername />
            <InputFieldPassword isSignup={false} />
            <InputFieldRememberMe />
            <button
                type="submit"
                className="mt-2 flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-3 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700 
                pc-sm:self-center 
                tablet-md:mb-10 tablet-md:self-center
                mobile-lg:mb-4 mobile-lg:gap-2 mobile-lg:px-6 mobile-lg:py-2 mobile-lg:text-2xl"
            >
                <span>Login</span>
                <IconLogin />
            </button>
        </>
    );
}

function SignupFields() {
    return (
        <>
            <InputFieldNameDetails />
            <section
                className="flex w-full flex-row items-center gap-10
                tablet-sm:gap-4
                mobile-lg:flex-col mobile-lg:gap-2"
            >
                <InputFieldEmail />
                <InputFieldUsername />
            </section>
            <InputFieldPassword isSignup={true} />
            <InputFieldAddress />
            <InputFieldGender />
            <button
                type="submit"
                className="mt-2 flex flex-row items-center gap-3 rounded-md bg-primary-500 px-8 py-3 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:bg-primary-600 hover:brightness-100 active:scale-95 active:bg-primary-700 
                pc-sm:mb-10 pc-sm:self-center
                mobile-lg:gap-2 mobile-lg:px-6 mobile-lg:py-2 mobile-lg:text-2xl"
            >
                <span>Sign Up</span>
                <IconSignup />
            </button>
        </>
    );
}

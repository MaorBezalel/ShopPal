import { useApi } from '@/shared/hooks/useApi.hook';
import type { LoginRequest } from '@/shared/services/user.service';
import { Link } from 'react-router-dom';
import { useRef, ElementRef } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/shared/hooks/useAuth.hook';
import { useForm } from 'react-hook-form';
import authBannerSVG from '@/assets/svgs/auth-banner.svg';
import { IconEmail, IconLogin, IconPassword, IconPasswordEye, IconUser } from '@/shared/components/icons';
import useFlag from '@/shared/hooks/useFlag.hook';

export function AuthPage() {
    const emailRef = useRef<ElementRef<'input'>>(null);
    const passwordRef = useRef<ElementRef<'input'>>(null);
    const rememberMeRef = useRef<ElementRef<'input'>>(null);
    const { userApi } = useApi();
    const { setAuth, setRememberMe } = useAuth();
    const { value: showPassword, toggle: toggleShowPassword } = useFlag(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        let loginDetails: LoginRequest = {
            email: emailRef.current?.value!,
            password: passwordRef.current?.value!,
        };
        let loginResult;

        try {
            loginResult = await userApi.login(loginDetails);
        } catch (error) {
            console.error(error);
        } finally {
            console.log(loginResult);

            if (loginResult && 'accessToken' in loginResult) {
                setAuth(loginResult);
                setRememberMe(rememberMeRef.current?.checked!);
            } else {
                console.error('an error occurred');
            }
        }
    };

    return (
        <main className="container-highlight container mx-auto flex flex-1 flex-row items-center justify-between gap-4 text-text-950">
            <section className="flex flex-col justify-start gap-4 pl-2">
                <h1 className="text-8xl font-bold">Welcome back!</h1>
                <p className="text-pretty pr-20 text-xl">
                    Log in to your account to enjoy a seamless shopping experience.
                </p>
                <form className="mt-2 flex flex-col items-start gap-4">
                    <section className="flex w-full flex-col gap-4 pr-56">
                        <label htmlFor="email_or_username" className="text-2xl">
                            Email or Username
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                id="email_or_username"
                                ref={emailRef}
                                className="w-full rounded-md px-10 py-2 text-xl outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500"
                                placeholder='e.g. "your@email.com"'
                            />
                            <IconUser className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950" />
                        </div>
                    </section>
                    <section className="flex w-full flex-col gap-4 pr-56">
                        <label htmlFor="password" className="text-2xl">
                            Password
                        </label>
                        <div className="relative w-full">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                ref={passwordRef}
                                className="w-full rounded-md px-10 py-2 text-xl outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500"
                                placeholder="password..."
                            />
                            <IconPassword className="absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950" />
                            <IconPasswordEye
                                className="absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950"
                                closed={!showPassword}
                                onClick={toggleShowPassword}
                            />
                        </div>
                    </section>
                    <section className="flex flex-row items-center gap-4 pr-56">
                        <input type="checkbox" id="rememberMe" ref={rememberMeRef} className="mt-0.5 size-3.5" />
                        <label htmlFor="rememberMe" className="text-2xl">
                            Remember me
                        </label>
                    </section>
                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="mt-2 flex flex-row items-center gap-3 rounded-md bg-secondary-300 px-8 py-3 text-3xl text-background-50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-secondary-400 hover:brightness-100 active:scale-95 active:bg-secondary-500"
                    >
                        <span>Login</span>
                        <IconLogin />
                    </button>
                    <p className="mt-4 text-pretty pr-20 text-xl">
                        Don't have an account yet?{' '}
                        <Link to="/auth/register" className="text-primary-500 hover:text-primary-700">
                            Sign up now
                        </Link>
                        .
                    </p>
                </form>
            </section>
            <img src={authBannerSVG} alt="auth banner" className="h-[50rem] w-[50rem]" />
        </main>
    );
}

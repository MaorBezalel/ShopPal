
import { useApi } from "@/shared/hooks/useApi.hook";
import type { LoginRequest } from "@/shared/services/user.service";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/shared/hooks/useAuth.hook";

export function AuthPage() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);
    const {userApi} = useApi();
    const {setAuth, setRememberMe} = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {

        e.preventDefault();

        let loginDetails: LoginRequest = {
            email: emailRef.current?.value!,
            password: passwordRef.current?.value!
        };
        let loginResult;

        try {
            loginResult = await userApi.login(loginDetails);
        }
        catch(error) {
            console.error(error);
        }
        finally {
            console.log(loginResult);

            if (loginResult && 'accessToken' in loginResult) {
                setAuth(loginResult);
                setRememberMe(rememberMeRef.current?.checked!);
            }
            else
            {
                console.error('an error occurred');
            }
        }
    };

    return (
        <div>
            <h1>Auth Page</h1>
            <form>
                <input type="text" placeholder="Email" ref={emailRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <label>Remember Me</label>
                <input type="checkbox" ref={rememberMeRef}/>
                <button type="submit" onClick={handleLogin}>Login</button>
            </form>
            <button onClick={() => navigate('/')}>Back To Home</button>
        </div>
    );
}
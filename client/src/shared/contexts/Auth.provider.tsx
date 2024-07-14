import {createContext, useState} from 'react';
import {User} from '@/shared/types/entities.types';

type Auth = {
    accessToken: string;
    user: User;
}

type AuthProviderProps = {
    children: React.ReactNode;
}

type AuthProviderValue = {
    auth: Auth | null;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

export const AuthContext = createContext<AuthProviderValue | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [auth, setAuth] = useState<Auth | null>(null);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
};
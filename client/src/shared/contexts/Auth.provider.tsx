import { createContext, useState } from 'react';
import { User } from '@/shared/types/entities.types';
import useLocalStorage from '@/shared/hooks/useLocalStorage.hook';

type Auth = {
    accessToken: string;
    user: User;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthProviderValue = {
    auth: Auth | null;
    rememberMe: boolean;
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
    setRememberMe: (value: boolean) => void;
};

export const AuthContext = createContext<AuthProviderValue | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [rememberMe, setRememberMe] = useLocalStorage<boolean>(`rememberMe`, false);

    return <AuthContext.Provider value={{ auth, rememberMe, setAuth, setRememberMe }}>{children}</AuthContext.Provider>;
};

import { useAuth } from '@/shared/hooks/useAuth.hook';

export function Header() {
    const { auth } = useAuth();

    return (
        <header>
            <h1>Header</h1>
            {auth?.user ? <p>Welcome {auth.user.username}</p> : null}
        </header>
    );
}

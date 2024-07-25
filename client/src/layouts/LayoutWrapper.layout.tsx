import { Outlet as CurrentPage } from 'react-router';
import { Header } from './header/Header.layout';

export function LayoutWrapper() {
    return (
        <div className="flex min-h-screen flex-col gap-4 overflow-hidden bg-background-50">
            <Header />
            <CurrentPage />
        </div>
    );
}

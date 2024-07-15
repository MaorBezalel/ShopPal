import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/shared/contexts/Auth.provider.tsx';
import { ApiProvider } from '@/shared/contexts/Api.provider.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <ApiProvider>
                    <Routes>
                        <Route path="/*" element={<App />} />
                    </Routes>
                </ApiProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

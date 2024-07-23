import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from '@/shared/contexts/Auth.provider.tsx';
import { ApiProvider } from '@/shared/contexts/Api.provider.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { MessageProvider } from './shared/contexts/Message.provider.tsx';
import { MessageBoard } from './shared/components/MessageBoard.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <MessageProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <ApiProvider>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                            <MessageBoard />
                        </ApiProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </MessageProvider>
        </BrowserRouter>
    </React.StrictMode>
);

import { useState } from 'react';
import { SERVER_URL } from '@/shared/constants';
import axois from 'axios';

export function usePublicAPI() {
    const [PUBLIC_API] = useState(() => {
        const publicAPI = axois.create({
            baseURL: SERVER_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        return publicAPI;
    });

    return PUBLIC_API;
}

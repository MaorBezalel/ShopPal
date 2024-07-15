import { ApiContext } from '@/shared/contexts/Api.provider';
import { useContext } from 'react';

export function useApi() {
    const context = useContext(ApiContext);

    if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
    }

    return context;
}

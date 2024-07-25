import { MessageContext } from '../contexts/Message.provider';
import { useContext } from 'react';

export function useMessages() {
    const context = useContext(MessageContext);

    if (!context) {
        throw new Error('useMessages must be used within an MessageProvider');
    }

    return context;
}

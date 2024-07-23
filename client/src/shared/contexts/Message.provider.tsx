import React, { createContext, useState } from 'react';

type Message = {
    id: string;
    message: string;
    type: 'error' | 'success';
    duration?: number;
};

type MessageContextValue = {
    messages: Message[];
    displayMessage: (message: Omit<Message, 'id'>) => string;
    clearMessage: (id: string) => void;
};

export const MessageContext = createContext<MessageContextValue | null>(null);

type MessageProviderProps = {
    children: React.ReactNode;
};

export const MessageProvider = ({ children }: MessageProviderProps) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const displayMessage = (message: Omit<Message, 'id'>) => {
        const id = Date.now().toString();
        setMessages((oldMessages) => [...oldMessages, { ...message, id }]);
        setTimeout(() => {
            setMessages((oldMessages) => oldMessages.filter((msg) => msg.id !== id));
        }, message.duration || 5000);

        return id;
    };

    console.log(messages);

    const clearMessage = (id: string) => {
        setMessages((oldMessages) => oldMessages.filter((msg) => msg.id !== id));
    };

    return (
        <MessageContext.Provider value={{ messages, displayMessage, clearMessage }}>{children}</MessageContext.Provider>
    );
};

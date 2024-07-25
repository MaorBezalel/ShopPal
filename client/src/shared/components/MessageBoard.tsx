import { useMessages } from '../hooks/useMessages.hook';

export const MessageBoard = () => {
    const { messages } = useMessages();

    return (
        <div className="z-999 fixed bottom-0 right-0 flex w-1/5 flex-col gap-2">
            {messages.map((message) => {
                return (
                    <div
                        key={message.id}
                        className={`p-4 ${message.type === 'success' ? 'bg-green-800' : 'bg-red-800'} rounded-md text-center font-semibold text-white opacity-90`}
                    >
                        {message.message}
                    </div>
                );
            })}
        </div>
    );
};

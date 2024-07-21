import React from 'react';
import {useState, useEffect} from 'react';

interface MessageProps {
    message?: string;
    className?: string;
    type: 'error' | 'success';
}

const Message: React.FC<MessageProps> = ({ message, className, type }) => {
    const [show, setShow] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timeoutDuration = 2500;
        const intervalDuration = 50;
        const timer = setTimeout(() => setShow(false), timeoutDuration);
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                const increment = (intervalDuration / timeoutDuration) * 100;
                const newProgress = oldProgress + increment;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, intervalDuration);
        return () => { 
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []); 

    if (!show) return null;

    return (
        <div className={`${type === 'error' ? 'bg-red-400 border-red-600' : 'bg-green-400 border-green-600'} p-4 ${className} fixed right-0 bottom-0 border`}>
            <p className='text-white'>{message || 'Something went wrong!'}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-primary-100 h-2.5 mt-2" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

export default Message;
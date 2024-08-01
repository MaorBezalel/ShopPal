import React from 'react';
import ExclamationIcon from '../icons/ExclamationIcon';

type ErrorMessageProps = {
    message: string;
};

const FormErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <p className="text-red-500 mt-3">
            <ExclamationIcon className="mb-2 inline" /> {message}
        </p>
    );
};

export default FormErrorMessage;
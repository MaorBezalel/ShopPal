import React, { ChangeEvent } from 'react';
import FormErrorMessage from './FormErrorMessage';

type InputFieldProps = {
    id: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    error: string;
};

const FormInputField: React.FC<InputFieldProps> = ({ id, name, value, onChange, placeholder, error }) => {
    return (
        <div>
            <label htmlFor={id} className="block mb-4">{placeholder}</label>
            <input
                type="text"
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`border-2 ${error ? 'border-red-500 focus:outline-red-500' : 'border-gray-300 focus:outline-primary-500'} rounded-md p-2 w-full`}
            />
            {error && <FormErrorMessage message={error} />}
        </div>
    );
};

export default FormInputField;
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormState } from 'react-hook-form';
import { IconPassword } from './icons';
import { IconPasswordEye } from './icons';
import useFlag from '../hooks/useFlag.hook';

type InputFieldPasswordProps<TFieldValues extends Record<string, any>, TFieldValueName extends string> = {
    register: () => UseFormRegisterReturn<TFieldValueName>;
    fieldName: TFieldValueName;
    formState: FormState<TFieldValues>;
    iconPasswordClassName?: string;
    InferError?: () => string;
    iconPasswordEyeClassName?: string;
} & React.HTMLProps<HTMLInputElement>;

const DEFAULT_CLASS_NAME_INPUT =
    'peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-md:text-base pc-sm:px-9 pc-sm:text-base tablet-sm:px-8 tablet-sm:text-sm';

export function InputFieldPassword<TFieldValues extends Record<string, any>, TFieldValueName extends string>({
    register,
    fieldName,
    formState: { errors },
    iconPasswordClassName,
    iconPasswordEyeClassName,
    InferError,
    ...inputProps
}: InputFieldPasswordProps<TFieldValues, TFieldValueName>) {
    const { value: showPassword, toggle: toggleShowPassword } = useFlag(false);
    return (
        <>
            <label
                htmlFor={fieldName}
                className="text-xl
            tablet-sm:text-lg"
            >
                {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="relative w-full">
                    <input
                        {...inputProps}
                        {...register()}
                        type={`${showPassword ? 'text' : 'password'}`}
                        className={`${inputProps.className || ''} ${DEFAULT_CLASS_NAME_INPUT}`}
                    />
                    <IconPassword
                        className={`absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 
                            pc-sm:size-6 ${iconPasswordClassName}`}
                    />
                    <IconPasswordEye
                        closed={!showPassword}
                        onClick={toggleShowPassword}
                        className={`absolute right-1 top-1/2 size-7 -translate-y-1/2 transform cursor-pointer text-text-950 peer-focus:text-accent-500 
                            pc-sm:size-6 ${iconPasswordEyeClassName}`}
                    />
                </div>
                <p
                    id={`error-${fieldName}`}
                    className="text-sm text-red-600"
                >
                    {(errors[fieldName]?.message as string) || InferError?.() || ''}
                </p>
            </div>
        </>
    );
}

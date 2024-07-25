import { UseFormRegisterReturn, FormState } from 'react-hook-form';
import { IconUser } from '@/shared/components/icons';

type InputFieldProps<
    TFieldValues extends Record<string, any>,
    TFieldValueName extends Extract<keyof TFieldValues, string>,
> = {
    register: () => UseFormRegisterReturn<TFieldValueName>;
    fieldName: TFieldValueName;
    formState: FormState<TFieldValues>;
    Icon: React.JSX.Element;
} & React.HTMLProps<HTMLInputElement>;

const DEFAULT_CLASS_NAME_INPUT =
    'peer w-full rounded-md px-10 py-1 text-lg outline outline-1 outline-text-950 focus:outline-2 focus:outline-accent-500 pc-md:text-base pc-sm:px-9 pc-sm:text-base tablet-sm:px-8 tablet-sm:text-sm';

const DEFAULT_CLASS_NAME_ICON =
    'absolute left-1 top-1/2 size-7 -translate-y-1/2 transform text-text-950 peer-focus:text-accent-500 pc-sm:size-6 tablet-sm:size-5';

export function InputField<
    TFieldValues extends Record<string, any>,
    TFieldValueName extends Extract<keyof TFieldValues, string>,
>({ register, fieldName, formState: { errors }, Icon, ...inputProps }: InputFieldProps<TFieldValues, TFieldValueName>) {
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
                    />
                    {Icon}
                </div>
                <p
                    id={`error-${fieldName}`}
                    className="text-sm text-red-600"
                >
                    {(errors[fieldName]?.message as string) || ''}
                </p>
            </div>
        </>
    );
}

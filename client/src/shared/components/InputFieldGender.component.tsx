import { UseFormRegisterReturn } from 'react-hook-form';
import { FormState } from 'react-hook-form';

type InputFieldGenderProps<TFieldValues extends Record<string, any>, TFieldValueName extends string> = {
    register: () => UseFormRegisterReturn<TFieldValueName>;
    formState: FormState<TFieldValues>;
};

export function InputFieldGender<TFieldValues extends Record<string, any>, TFieldValueName extends string>({
    register,
    formState: { errors },
}: InputFieldGenderProps<TFieldValues, TFieldValueName>) {
    return (
        <>
            <label
                htmlFor="gender"
                className="text-xl 
                tablet-sm:text-lg"
            >
                Gender
            </label>
            <div className="flex w-full flex-col gap-2">
                <div className="flex w-full flex-row gap-4">
                    <div className="flex flex-row gap-2">
                        <input
                            type="radio"
                            className="w-[1rem] cursor-pointer rounded-md
                            tablet-sm:w-[0.75rem]"
                            aria-errormessage="error-gender"
                            value="male"
                            {...register()}
                        />
                        <label
                            htmlFor="male"
                            className="text-lg
                            tablet-sm:text-base"
                        >
                            Male
                        </label>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input
                            type="radio"
                            className="w-[1rem] cursor-pointer rounded-md
                            tablet-sm:w-[0.75rem]"
                            aria-errormessage="error-gender"
                            value="female"
                            {...register()}
                        />
                        <label
                            htmlFor="female"
                            className="text-lg
                            tablet-sm:text-base"
                        >
                            Female
                        </label>
                    </div>
                    <div className="flex flex-row gap-2">
                        <input
                            type="radio"
                            className="w-[1rem] cursor-pointer rounded-md
                            tablet-sm:w-[0.75rem]"
                            aria-errormessage="error-gender"
                            value="other"
                            {...register()}
                        />
                        <label
                            htmlFor="other"
                            className="text-lg
                            tablet-sm:text-base"
                        >
                            Other
                        </label>
                    </div>
                </div>
                <p
                    id="error-gender"
                    className="text-sm text-red-600"
                >
                    {(errors?.gender?.message as string) || ''}
                </p>
            </div>
        </>
    );
}

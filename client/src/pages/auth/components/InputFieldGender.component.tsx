import { useFormContext } from 'react-hook-form';

export function InputFieldGender() {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const registerGender = register('gender', {
        required: 'Gender is required!',
    });

    return (
        <section className="flex w-full flex-col gap-4 pr-56 tablet-sm:gap-2">
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
                            {...registerGender}
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
                            {...registerGender}
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
                            {...registerGender}
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
        </section>
    );
}

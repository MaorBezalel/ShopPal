import { useForm, FormProvider } from 'react-hook-form';
import { useAuthFormActions } from '@/pages/auth/hooks';
import { FormInputs } from '@/pages/auth/types';
import { DialogModal } from '@/shared/components/DialogModal.component';
import { IconError } from '@/shared/components/icons';

export type AuthFormProps = {
    formType: 'login' | 'signup';
    children: React.ReactNode;
} & Pick<React.HTMLAttributes<HTMLFormElement>, 'className'>;

export function AuthForm({ formType, children, className }: AuthFormProps) {
    const methods = useForm<FormInputs<typeof formType>>({
        defaultValues:
            formType === 'login'
                ? { emailOrUsername: '', password: '', rememberMe: false }
                : {
                      email: '',
                      username: '',
                      password: '',
                      name_details: {
                          first_name: '',
                          middle_name: '',
                          last_name: '',
                      },
                      address: {
                          country: '',
                          city: '',
                          street: '',
                      },
                  },
    });
    const { onSubmit, onError, error, setError } = useAuthFormActions<typeof formType>();

    return (
        <FormProvider {...methods}>
            <form
                className={className}
                onSubmit={methods.handleSubmit(onSubmit, onError)}
            >
                {children}
            </form>
            <DialogModal
                open={!!error}
                onClose={() => setError(null)}
                className="flex flex-col items-center gap-4"
            >
                <div className="mt-4 flex flex-row items-center gap-2">
                    <IconError className="size-16 text-red-600" />
                    <h1 className="text-3xl font-bold text-text-950">
                        {error?.statusCode} Error during {formType}!
                    </h1>
                </div>
                <p className="text-lg text-text-950">{error?.message}</p>
                <div className="mt-4 flex w-full flex-row justify-end gap-4">
                    <button
                        className="rounded-md bg-accent-500 px-4 py-2 text-white transition-all duration-200 ease-in-out hover:bg-accent-600 hover:brightness-100 active:scale-95 active:bg-accent-700"
                        onClick={() => setError(null)}
                    >
                        Close
                    </button>
                </div>
            </DialogModal>
        </FormProvider>
    );
}

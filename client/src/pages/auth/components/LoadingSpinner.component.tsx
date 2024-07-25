import ReactDOM from 'react-dom';
import LoadingAnimation from '@/shared/components/LoadingAnimation';

type LoadingSpinner = {
    open: boolean;
};

export function LoadingSpinner({ open }: LoadingSpinner) {
    return ReactDOM.createPortal(
        open ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-md rounded-lg">
                    <LoadingAnimation />
                </div>
            </div>
        ) : null,
        document.body
    );
}

import { HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';

type DialogModalProps = HTMLAttributes<HTMLDivElement> & {
    open: boolean;
    onClose: () => void;
};

export function DialogModal({ open, onClose, children, ...props }: DialogModalProps) {
    return ReactDOM.createPortal(
        open ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="relative w-full max-w-md rounded-lg bg-white p-4 shadow-lg">
                    <button className="absolute right-2 top-2" onClick={onClose} aria-label="Close dialog">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                    <div {...props}>{children}</div>
                </div>
            </div>
        ) : null,
        // document.getElementById('modal-root')!
        document.body
    );
}

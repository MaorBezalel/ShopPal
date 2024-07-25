import { useState } from 'react';

export default function useLoadingOverlay() {
    const [isLoading, setIsLoading] = useState(false);

    const LoadingOverlay = () => (
        isLoading ? (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : null
    );

    return { setIsLoading, LoadingOverlay };
}
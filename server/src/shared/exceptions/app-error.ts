import type { HttpStatusCode } from '@/shared/types/httpcode.types';

class AppError extends Error {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly path: string;

    constructor(message: string, statusCode?: HttpStatusCode, path?: string) {
        super(message);
        this.message = message || 'Internal Server Error';
        this.statusCode = statusCode || 500;
        this.path = path || 'unknown';
    }
}

export default AppError;

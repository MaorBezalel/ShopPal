import type { Request, Response, NextFunction } from 'express';

/**
 * CORS middleware function to dynamically set the Access-Control-Allow-Origin header
 * based on the incoming request's origin. This is necessary to allow any domain to
 * interact with the server while including credentials (cookies) for authorization.
 *
 * Using 'credentials: include' on the client side requires a specific origin to be
 * set in the Access-Control-Allow-Origin header on the server side. The wildcard '*'
 * cannot be used in this case. This middleware dynamically sets the appropriate origin
 * to ensure CORS compliance and security.
 *
 * NOTE 1: This middleware should be used before any other middleware that handles routes.
 * NOTE 2: This middleware should be used only in development. In production, the origin
 * should be set to the client's domain.
 */
const corsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    // If the request has an origin header, set the Access-Control-Allow-Origin header to that origin
    if (origin) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    // Allow credentials (cookies) to be included in cross-origin requests
    res.header('Access-Control-Allow-Credentials', 'true');

    // Specify allowed HTTP methods for cross-origin requests
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');

    // Specify allowed headers for cross-origin requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
};

export default corsMiddleware;
